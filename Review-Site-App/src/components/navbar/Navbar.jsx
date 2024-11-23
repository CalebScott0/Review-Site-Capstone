import Button from '../Button';
import Container from '../Container';
import Logo from './Logo';
import Search from './searchbars/Search';
import UserMenu from './UserMenu';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

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
      className={`${pathname === '/search' ? 'fixed' : ''} z-10 w-full bg-white shadow-sm`}
    >
      <div className='border-b py-6'>
        <Container>
          <div className='mx-2 mb-4 flex flex-col items-center justify-between lg:flex-row'>
            <div className='absolute left-4 top-5 lg:static'>
              <Logo />
            </div>
            <div className='mr-10 mt-14 flex w-full justify-center md:mx-10 md:mt-10 lg:mt-0 lg:block xl:-ml-6 xl:mr-40'>
              <Search
                handleSingleBusinessClick={handleSingleBusinessClick}
                handleCategoryListingsClick={handleCategoryListingsClick}
                handleBusinessListingsClick={handleBusinessListingsClick}
              />
            </div>
            <div className='absolute right-4 top-3 lg:static'>
              <UserMenu />
            </div>
          </div>
        </Container>
        <Container>
          <div className='mt-6'>
            <Button label='Categories' outline disabled small />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
