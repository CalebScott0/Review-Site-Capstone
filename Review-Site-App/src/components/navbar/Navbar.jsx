import Button from "../Button";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./searchbars/Search";
import UserMenu from "./UserMenu";
import { useLocation } from "react-router-dom";

const Navbar = ({
  handleBusinessListingsClick,
  handleCategoryListingsClick,
  handleSingleBusinessClick,
}) => {
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
            {/* <Search
              handleSingleBusinessClick={handleSingleBusinessClick}
              handleCategoryListingsClick={handleCategoryListingsClick}
              handleBusinessListingsClick={handleBusinessListingsClick}
              /> */}
            <UserMenu />
          </div>
        </Container>
        <Container>
          <div className="mt-6">
            {/* DLETE AND UNCOMMENT OUT TOP - JUST PUTTING THIS HERE TO CHECK OUT ON MOBILE  */}
            <Search
              handleSingleBusinessClick={handleSingleBusinessClick}
              handleCategoryListingsClick={handleCategoryListingsClick}
              handleBusinessListingsClick={handleBusinessListingsClick}
            />
            <Button label="Categories" outline disabled small />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
