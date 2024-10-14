const MenuItem = ({ label }) => {
  return (
    <div className="xl:min-w-28 hover:bg-neutral-100 xl:hover:bg-white xl:hover:shadow-md transition font-semibold px-4 xl:px-1 py-4 text-sm cursor-pointer border-transparent xl:border-b-2 xl:hover:border-black xl:text-center">
      {label}
    </div>
  );
};

export default MenuItem;
