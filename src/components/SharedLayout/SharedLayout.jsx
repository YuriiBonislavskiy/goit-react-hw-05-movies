import { Outlet } from 'react-router-dom';
import { PageHeader, NavList, NavItem, StyledLink } from './SharedLayout.styled';
import { Suspense } from 'react';
import Loader from 'components/Loader';

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
        <Suspense fallback={<Loader/>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;