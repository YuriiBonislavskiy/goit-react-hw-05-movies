import { Outlet } from 'react-router-dom';
import { NavList, NavItem, StyledLink } from './SharedLayout.styled';


// localhost:3000/
//localhost:3000/dogs
//localhost:3000/dogs/dog-5

export const SharedLayout = () => {
  return (
    <>
      <header>
        <NavList>
          <NavItem>
            <StyledLink to="/">Home</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/movies">Movies</StyledLink>
          </NavItem>
        </NavList>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;