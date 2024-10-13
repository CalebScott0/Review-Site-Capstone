const MenuItem = ({ label }) => {
  return (
    <div className="min-w-28 hover:shadow-sm transition font-semibold px-1 py-4 text-sm cursor-pointer border-transparent border-b-2 hover:border-black text-center">
      {label}
    </div>
  );
};

export default MenuItem;
