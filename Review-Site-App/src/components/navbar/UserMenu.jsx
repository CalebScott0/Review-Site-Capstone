import MenuItem from "./MenuItem";
import Button from "../Button";

const UserMenu = () => {
  return (
    <div className="hidden lg:flex items-center md:gap-2 gap-0 ml-10">
      {/* UserMenu OR just login and sign up buttons? (look at yelp and
      trustpilot)  */}
      <MenuItem label="Write a reivew" />
      <MenuItem label="Categories" />
      <MenuItem label="For businesses" />
      <div className="flex gap-3 ml-3 ">
        <Button label="Login" outline />
        <Button label="Sign up" />
      </div>
    </div>
  );
};

export default UserMenu;
