const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full min-w-24 h-auto relative transition rounded-lg hover:opacity-80 px-4 disabled:cursor-not-allowed disabled:opacity-70
        ${outline ? "bg-white" : "bg-amber-500"}
        ${outline ? "hover:bg-neutral-100" : ""}
        ${outline ? "border-black" : "border-amber-500"}
        ${outline ? "text-black" : "text-white"}  
        ${small ? "py-1" : "py-2"}
        ${small ? "border" : "border-2"}
        ${small ? "text-sm" : "text-base"}
        ${small ? "font-light" : "font-semibold"}
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className={`absolute left-4 ${small ? "bottom-[2px] text-neutral-600" : ""}`}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
