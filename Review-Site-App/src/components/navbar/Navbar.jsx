import Button from "../Button";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b py-6">
        <Container>
          <div className="flex flex-row items-center mb-4">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
        <Container>
          <Button
            label="Categories drop down will go here"
            outline
            // small
            icon={AiOutlineSearch}
          />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
