export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    border: "none",
    outline: state.isFocused ? "2px solid rgba(107, 114, 128, 0.5)" : "none", // Gray ring on focus
    outlineOffset: "2px", // Adds space between the element and the ring
    paddingTop: "6px",
    paddingBottom: "6px",
    boxShadow: "none",
    paddingRight: window.innerWidth < 768 ? "42px" : "",
    paddingLeft: window.innerWidth < 768 ? "30px" : "",
    borderRadius: "0.125rem", //tailwind sm radius
    cursor: "text",
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
