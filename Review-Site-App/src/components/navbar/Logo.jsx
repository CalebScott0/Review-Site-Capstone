import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src="/Logo.png" alt="Star" className="w-6" />
      <span className="ml-1 text-lg font-semibold font-mono">ReviewGuru</span>
    </div>
  );
};

export default Logo;
