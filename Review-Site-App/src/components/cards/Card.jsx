const Card = ({ children, className }) => {
  return <div className={`w-full p-4  ${className}`}>{children}</div>;
};

export default Card;
