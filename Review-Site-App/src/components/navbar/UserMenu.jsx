import MenuItem from "./MenuItem";
import Button from "../Button";

const UserMenu = () => {
  return (
    <div className="hidden md:flex">
      {/* UserMenu OR just login and sign up buttons? (look at yelp and
      trustpilot)  */}
      <MenuItem label="Write a reivew" />
      <MenuItem label="Categories" />
      <MenuItem label="For businesses" />
      <div className="flex gap-3">
        <Button label="Login" outline />
        <Button label="Sign up" />
      </div>
    </div>
  );
};

export default UserMenu;
