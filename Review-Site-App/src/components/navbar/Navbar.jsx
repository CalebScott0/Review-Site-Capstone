import Button from "../Button";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    // fixed on list page, not fixed on single business page
    <div
      className={`${pathname === "/search" ? "fixed" : ""} z-10 w-full bg-white shadow-sm`}
    >
      <div className="border-b py-6">
        <Container>
          <div className="flex flex-row items-center mb-4 justify-between mx-2">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
        <Container>
          <div className="mt-6">
            <Button label="Categories" outline disabled small />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
