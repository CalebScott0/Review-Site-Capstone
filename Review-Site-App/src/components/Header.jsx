const Header = ({ children, classname }) => {
  return (
    <header className={`${classname}`}>
      <h1 className="text-2xl tracking-wide leading-10 ml-6">{children}</h1>
    </header>
  );
};

export default Header;
