const Input = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required, //   errors is an object, can look for id of input in errors object for class conditional
  errors,
  error,
}) => {
  // only take error if it is a string
  const errorMessage =
    error && typeof error.message === "string" ? error.message : null;
  return (
    <div className="relative w-full">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70  "pl-4" ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${errors[id] ? "focus:border-rose-500" : "focus:border-black"} `}
      />
      {/* on peer focus, translate label up 4 and scale to 75 */}
      <label
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 transform text-base duration-150 left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
      {errorMessage && <div className="mt-2 text-rose-500">{errorMessage}</div>}
    </div>
  );
};

export default Input;
