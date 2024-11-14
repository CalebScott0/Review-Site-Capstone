import MenuItem from "./MenuItem";

import Button from "../Button";

import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";

import { useCallback, useEffect, useRef, useState } from "react";

const UserMenu = () => {
  const menuOptions = [
    { label: "Write a review", onClick: () => {} },
    { label: "Categories", onClick: () => {} },
    { label: "For businesses", onClick: () => {} },
    { label: "Login", onClick: () => {} },
    { label: "Sign up", onClick: () => {} },
  ];

  const mainMenuOptions = menuOptions.slice(0, 3);

  const authMenuOptions = menuOptions.slice();
  const [isOpen, setIsOpen] = useState(false);

  // ref to dropdown div for event listeners when open
  const menuRef = useRef(null);

  // ref to user menu button toggle to stop handleClickOutside from firing on menu click when open
  // this caused handleClickOutside to fire -> and then toggleOpen to fire
  const userButtonRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

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
        <div className="flex gap-3 ml-3 ">
          <Button label="Login" outline />
          <Button label="Sign up" />
        </div>
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
          {authMenuOptions.map((item, idx) => (
            <MenuItem label={item.label} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
