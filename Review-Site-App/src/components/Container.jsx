const Container = ({ children }) => {
  return (
    <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-5 xl:px-10">
      {children}
    </div>
  );
};

export default Container;
