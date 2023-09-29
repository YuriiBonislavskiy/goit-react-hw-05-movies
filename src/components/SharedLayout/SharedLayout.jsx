import { Outlet } from 'react-router-dom';
import { PageHeader, NavList, NavItem, StyledLink } from './SharedLayout.styled';


// localhost:3000/
//localhost:3000/dogs
//localhost:3000/dogs/dog-5

export const SharedLayout = () => {
  return (
    <>
      <PageHeader>
        <NavList>
          <NavItem>
            <StyledLink to="/">Home</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/movies">Movies</StyledLink>
          </NavItem>
        </NavList>
      </PageHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;