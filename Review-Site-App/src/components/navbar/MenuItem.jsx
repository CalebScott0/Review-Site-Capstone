// import { NavLink } from "react-router-dom";

const MenuItem = ({ label, handleClick }) => {
  // will work for both xl+ screens as part of the main nav or for smaller screens as drop down
  return (
    <div
      onClick={handleClick}
      className="xl:min-w-28 hover:bg-neutral-100 xl:hover:bg-white xl:hover:shadow-sm transition font-semibold px-4 xl:px-1 py-4 text-sm cursor-pointer border-transparent  xl:border-b-2 hover:border-black xl:text-center"
    >
      {/* <NavLink> */}
      {label}
      {/* </NavLink> */}
    </div>
  );
};

export default MenuItem;
