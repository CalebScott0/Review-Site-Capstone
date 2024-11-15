import MenuItem from "./MenuItem";

import Button from "../Button";

import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import { onRegisterOpen } from "../../redux/slices/registerModalSlice";
import { onLoginOpen } from "../../redux/slices/loginModalSlice";
import { useLogoutMutation } from "../../redux/services/authSlice";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const dispatch = useDispatch();

  // user Id from auth slice
  const userId = useSelector((state) => state.auth.userId);

  const [logout] = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);

  // ref to dropdown div for event listeners when open
  const menuRef = useRef(null);

  // ref to user menu button toggle to stop handleClickOutside from firing on menu click when open
  // this caused handleClickOutside to fire -> and then toggleOpen to fire
  const userButtonRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuOptions = [
    {
      label: "Write a review",
      onClick: () => {
        toggleOpen();
      },
    },
    {
      label: "Categories",
      onClick: () => {
        toggleOpen();
      },
    },
    {
      label: "For businesses",
      onClick: () => {
        toggleOpen();
      },
    },

    {
      label: "Login",
      onClick: () => {
        dispatch(onLoginOpen());
        toggleOpen();
      },
    },
    {
      label: "Sign up",
      onClick: () => {
        dispatch(onRegisterOpen());
        toggleOpen();
      },
    },
  ];

  const mainMenuOptions = menuOptions.slice(0, 3);

  const authMenuOptions = menuOptions.slice(3);

  // use effect to add event listener on component mount and remove when unmounted
  useEffect(() => {
    // close menu on click outside - set event type explicitly to mouse event
    const handleClickOutside = (e) => {
      // event.target is the dom element that was clicked on "mousedown"
      // contains will be true for any element that is a child of the drop down ref div
      //  false for elements that are not a child of the drop down rev div
      // and false if current is not the user menu button
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      )
        toggleOpen();
    };

    const handleEscape = (e) => {
      // if key press is escape, close menu ONLY IF MENU IS OPEN
      if (e.key === "Escape" && isOpen) toggleOpen();
    };

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    // clean up on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, [toggleOpen, isOpen]);

  // grab user location if available
  // useEffect(() => {
  // console.log(sessionStorage.getItem("userCoordinates"));

  // });

  return (
    <div className="relative">
      <div className="hidden xl:flex items-center md:gap-2 gap-0">
        {mainMenuOptions.map((item, idx) => (
          <MenuItem key={idx} handleClick={item.onClick} label={item.label} />
        ))}
        {!userId ? (
          <div className="flex gap-3 ml-3 ">
            <Button
              label="Login"
              outline
              onClick={() => dispatch(onLoginOpen())}
            />
            <Button
              label="Sign up"
              onClick={() => dispatch(onRegisterOpen())}
            />
          </div>
        ) : (
          <div className="min-w-32">
            <Button
              outline
              label="Sign out"
              onClick={() => {
                dispatch(logout());
                toggleOpen();
              }}
            />
          </div>
        )}
      </div>
      {/* drop down menu for medium and smaller screens */}
      <div
        ref={userButtonRef}
        onClick={(e) => {
          e.stopPropagation();
          // prevent click event from bubbling up to dom - interferes with event listeners
          toggleOpen();
        }}
        className="active:scale-95 flex cursor-pointer items-center border-neutral-200 border xl:hidden rounded-full p-2 mx-2 transition hover:shadow-md gap-2"
      >
        <AiOutlineMenu />
        <Avatar size={24} userMenu />
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-10 right-0 top-12 w-52 md:w-[25vw] bg-white shadow-md overflow-hidden rounded-lg border"
        >
          {mainMenuOptions.map((item, idx) => (
            <MenuItem label={item.label} handleClick={item.onClick} key={idx} />
          ))}
          <hr />
          {!userId ? (
            authMenuOptions.map((item, idx) => (
              <MenuItem
                label={item.label}
                handleClick={item.onClick}
                key={idx}
              />
            ))
          ) : (
            <MenuItem label="Sign out" handleClick={() => dispatch(logout())} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
