const Card = ({ children, className }) => {
  return <section className={`w-full p-4  ${className}`}>{children}</section>;
};

export default Card;
