import Button from "../Button";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b py-6">
        <Container>
          <div className="flex flex-row items-center mb-4 justify-between">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
        <Container>
          <Button
            label="Categories drop down will go here"
            outline
            disabled
            // small
          />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
