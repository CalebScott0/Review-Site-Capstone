export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    border: "none",
    boxShadow: "none",
    paddingTop: "6px",
    paddingBottom: "6px",
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
