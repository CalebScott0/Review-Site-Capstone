import Button from "../Button";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./searchbars/Search";
import UserMenu from "./UserMenu";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

/*
 * TODO:
 *  - Add categories dropdown
 *  - Hide searchbars and categories on review form page and do not show bottom border of nav as well on this page?
 */

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
          <div className="flex lg:flex-row flex-col items-center mb-4 justify-between mx-2">
            <div className="lg:static absolute top-5 left-4">
              <Logo />
            </div>
            <div className="mt-14 md:mt-10 lg:mt-0 w-full flex justify-center lg:block mr-10 xl:mr-40 xl:-ml-6 md:mx-10 ">
              <Search
                handleSingleBusinessClick={handleSingleBusinessClick}
                handleCategoryListingsClick={handleCategoryListingsClick}
                handleBusinessListingsClick={handleBusinessListingsClick}
              />
            </div>
            <div className="absolute lg:static top-3 right-4">
              <UserMenu />
            </div>
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
