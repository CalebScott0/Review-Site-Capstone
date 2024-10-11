const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  // option to have a button with 100% width
  fullWidth,
}) => {
  // buttons with an icon need to be w-full to display properly
  if (Icon) {
    fullWidth = true;
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative transition rounded-lg hover:opacity-80 px-4 disabled:cursor-not-allowed disabled:opacity-70
        // Width auto as default to make buttons responsive
        ${fullWidth ? "w-full" : "w-auto"}
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
      {Icon && <Icon size={24} className="absolute left-4 top-2" />}
      {label}
    </button>
  );
};

export default Button;
