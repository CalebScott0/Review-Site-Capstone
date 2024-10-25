const CardHeader = ({ children, className }) => {
  return (
    <div className={`font-bold text-xl tracking-wide p-2 ${className}`}>
      {children}
    </div>
  );
};
export default CardHeader;
