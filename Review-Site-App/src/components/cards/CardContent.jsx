const CardContent = ({ children, className }) => {
  return (
    <div
      className={`text-neutral-600 break-words break-all whitespace-normal ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContent;
