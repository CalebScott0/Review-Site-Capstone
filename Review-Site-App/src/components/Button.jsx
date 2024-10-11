const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative transition hover:opacity-80 rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-70
        ${outline ? "bg-white" : "bg-amber-500"}
        ${outline ? "border-black" : "border-amber-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "border" : "border-2"}
        ${small ? "text-sm" : "text-base"}
        ${small ? "font-light" : "font-semibold"}
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
