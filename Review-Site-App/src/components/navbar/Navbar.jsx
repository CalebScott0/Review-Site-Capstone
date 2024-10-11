import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b py-6">
        <Container>
          <div className="flex flex-row items-center gap-3 md:gap-0 justify-between">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
        <Container>
          <div className="mt-3">Categories</div>
          {/* Categories */}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
