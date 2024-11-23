// import { NavLink } from "react-router-dom";

const MenuItem = ({ label, handleClick, icon: Icon }) => {
  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer border-transparent px-4 py-4 text-sm font-semibold transition hover:bg-neutral-100`}
    >
      {/* <NavLink> */}
      {Icon && <Icon size={20} className='absolute left-2' />}
      <span className={`${Icon ? 'ml-4' : ''}`}>{label}</span>
      {/* </NavLink> */}
    </div>
  );
};

export default MenuItem;
