import MenuItem from "./MenuItem";
import Button from "../Button";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  return (
    <div className="relative">
      <div className="hidden xl:flex items-center md:gap-2 gap-0">
        <MenuItem label="Write a reivew" />
        <MenuItem label="Categories" />
        <MenuItem label="For businesses" />
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
          <MenuItem label="Write a review" />
          <MenuItem label="Categories" />
          <MenuItem label="For businesses" />
          <hr />
          <MenuItem label="Log in" />
          <MenuItem label="Signup" />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
