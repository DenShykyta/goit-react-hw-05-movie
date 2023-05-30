import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, Container, Header, List } from './SharedLayout.styled';

const SharedLayout = () => {
  return (
    <Container>
      <Header>
        <nav>
          <List>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
          </List>
        </nav>
      </Header>
      <Suspense>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default SharedLayout;
