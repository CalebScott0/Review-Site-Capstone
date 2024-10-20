export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    border: "none",
    // boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 140, 246, 0.5)" : "none", // Tailwind ring-blue-500 effect
    boxShadow: "none",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: window.innerWidth < 768 ? "42px" : "",
    paddingLeft: window.innerWidth < 768 ? "30px" : "",
    borderRadius: "0.125rem", //tailwind sm radius
    cursor: "text",
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white", // Customize the background color of the dropdown menu
    // borderRadius: "0.5rem", //tailwind round-lg value
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f5f5f5" : "white", // neutral-100 hex value
    color: "black",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "gray",
    },
  }),
};

export const noOptionsMessage = () => {
  return <div className="p-3 text-center">No results found</div>;
};
