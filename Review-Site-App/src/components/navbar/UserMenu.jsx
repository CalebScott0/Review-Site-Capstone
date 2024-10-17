import MenuItem from "./MenuItem";
import Button from "../Button";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useEffect, useState } from "react";

const menuOptions = [
  { label: "Find near me", onClick: () => {} },
  { label: "Write a review", onClick: () => {} },
  { label: "Categories", onClick: () => {} },
  { label: "For businesses", onClick: () => {} },
  { label: "Login", onClick: () => {} },
  { label: "Sign up", onClick: () => {} },
];

const mainMenuOptions = menuOptions.slice(0, 4);

const authMenuOptions = menuOptions.slice(4);

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  // grab user location if available
  useEffect(() => {
    console.log(sessionStorage.getItem("userCoordinates"));
  });

  return (
    <div className="relative">
      <div className="hidden xl:flex items-center md:gap-2 gap-0">
        {mainMenuOptions.map((item, idx) => (
          <MenuItem label={item.label} key={idx} />
        ))}
        <div className="flex gap-3 ml-3 ">
          <Button label="Login" outline />
          <Button label="Sign up" />
        </div>
      </div>
      {/* drop down menu for medium and smaller screens */}
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer items-center border-neutral-200 border xl:hidden rounded-full p-2 mx-2 transition hover:shadow-md gap-2"
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 right-0 top-12 w-52 md:w-[25vw] bg-white shadow-md overflow-hidden rounded-lg border">
          {mainMenuOptions.map((item, idx) => (
            <MenuItem label={item.label} key={idx} />
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
