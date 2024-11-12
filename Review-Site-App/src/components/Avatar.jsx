import { IoPerson } from "react-icons/io5";

const Avatar = ({ size, userMenu }) => {
  // Define the array of colors
  const colors = [
    "#FF5A5F", // - Bright Coral Red
    "#FFD93D", // - Bright Yellow
    "#6BCB77", // - Fresh Green
    "#4D96FF", // - Sky Blue
    "#9B5DE5", // - Vivid Purple
    "#36CFC9", // - Aqua
  ];

  // Pick a random color from the array
  const bgColor = colors[Math.floor(Math.random() * colors.length)];

  return userMenu ? (
    // for user menu on smaller screen
    <div className="w-7">
      {" "}
      <img
        className="rounded-full w-full"
        src="/placeholder.png"
        alt="Avatar"
      />
    </div>
  ) : (
    // for review listings
    <div
      style={{ backgroundColor: bgColor }}
      className="border border-neutral-600 rounded-full p-2 text-neutral-600 shadow-md"
    >
      <IoPerson size={size} />
    </div>
  );
};

export default Avatar;
