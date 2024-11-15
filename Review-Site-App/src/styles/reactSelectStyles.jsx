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
    paddingRight: "0px",
    paddingLeft: "10px",
    borderRadius: "0.125rem", //tailwind sm radius
    cursor: "text",
    width: "100%", // Ensures the control spans the full width of its container
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white", // Customize the background color of the dropdown menu
    width: "100%", // Makes the menu width the same as the control's width
    minWidth: "300px", // You can set a minimum width for the dropdown
    maxWidth: "400px", // You can also set a max width if you want it constrained
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
