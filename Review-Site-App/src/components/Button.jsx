const Button = ({
  label,
  onClick,
  disabled,
  outline,
  warning,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`focus:outline-none focus:ring-2 focus:ring-neutral-500/50 focus:ring-offset-2 focus:ring-offset-white w-full min-w-24 h-auto relative transition rounded-lg hover:opacity-80 px-4 disabled:cursor-not-allowed disabled:opacity-70
        ${disabled ? "" : "active:scale-95"}
        ${outline ? "bg-white" : warning ? "bg-rose-500" : "bg-amber-500"}
        ${outline ? "hover:bg-neutral-100" : ""}
        ${outline ? "border-black" : warning ? "border-rose-500" : "border-amber-500"}
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
          className={`absolute left-2 ${small ? "bottom-[2px] text-neutral-600" : ""}`}
        />
      )}
      <span className={`${Icon ? "ml-4" : ""}`}>{label}</span>
    </button>
  );
};

export default Button;
