const Heading = ({ title, subtitle, center, warningLabel }) => {
  return (
    <div
      className={`whitespace-pre-line ${center ? "text-center" : "text-start"}`}
    >
      <div
        className={`text-2xl font-bold tracking-wide ${warningLabel ? "text-rose-500" : "text-black"}`}
      >
        {title}
      </div>
      <div
        className={`mt-2 ${warningLabel ? "text-rose-500 font-semibold" : "text-neutral-500 font-light"}`}
      >
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
