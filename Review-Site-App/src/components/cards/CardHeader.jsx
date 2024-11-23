const CardHeader = ({ children, className }) => {
  return (
    <h2 className={`p-2 text-xl font-bold tracking-wide ${className}`}>
      {children}
    </h2>
  );
};
export default CardHeader;
