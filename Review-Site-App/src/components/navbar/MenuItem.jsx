// import { NavLink } from "react-router-dom";

const MenuItem = ({ label, handleClick, icon: Icon }) => {
  return (
    <div
      onClick={handleClick}
      className={`hover:bg-neutral-100 transition font-semibold px-4 py-4 text-sm cursor-pointer border-transparent`}
    >
      {/* <NavLink> */}
      {Icon && <Icon size={20} className="absolute left-2" />}
      <span className={`${Icon ? "ml-4" : ""}`}>{label}</span>
      {/* </NavLink> */}
    </div>
  );
};

export default MenuItem;
