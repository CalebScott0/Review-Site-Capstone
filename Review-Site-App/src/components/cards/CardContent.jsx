const CardContent = ({ children, className }) => {
  return <div className={`text-neutral-800 ${className}`}>{children}</div>;
};

export default CardContent;
