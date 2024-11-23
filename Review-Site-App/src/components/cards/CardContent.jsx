const CardContent = ({ children, className }) => {
  return (
    <div
      className={`whitespace-normal break-words break-all text-neutral-600 ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContent;
