const Badge = ({ children, onClick, disabled, outline, round }) => {
  return (
    <div
      onClick={onClick}
      className={`text-xs px-1.5 py-0.5 w-fit text-neutral-600 font-semibold ${round ? "rounded-full" : "rounded-md"} ${!disabled ? "hover:bg-opacity-50 active:scale-95" : ""}
      ${outline ? "border-neutral-500 border bg-white" : "bg-neutral-300 bg-opacity-80 "}`}
    >
      {children}
    </div>
    // className="bg-neutral-300 bg-opacity-80 text-sm rounded-md px-2 py-0.5 hover:bg-opacity-50 active:scale-95"
  );
};

export default Badge;
