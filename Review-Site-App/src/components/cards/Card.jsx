const Card = ({ children, className, onClick }) => {
  return (
    <section onClick={onClick} className={`w-full p-4  ${className}`}>
      {children}
    </section>
  );
};

export default Card;
