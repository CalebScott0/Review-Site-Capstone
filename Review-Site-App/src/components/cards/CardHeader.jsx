const CardHeader = ({ children, className }) => {
  return (
    <h2 className={`font-bold text-xl tracking-wide p-2 ${className}`}>
      {children}
    </h2>
  );
};
export default CardHeader;
