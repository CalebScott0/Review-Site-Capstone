const CardContent = ({ children, className }) => {
  return <div className={`text-neutral-600 ${className}`}>{children}</div>;
};

export default CardContent;
