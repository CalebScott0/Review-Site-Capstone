const MenuItem = ({ label }) => {
  return (
    <div className="transition font-semibold px-3 py-4 text-sm cursor-pointer border-transparent border-b-2 hover:border-black">
      {label}
    </div>
  );
};

export default MenuItem;
