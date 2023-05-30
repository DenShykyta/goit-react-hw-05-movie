import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  padding: 30px;
`;
export const Header = styled.header`
  border-bottom: 4px solid grey;
`;
export const List = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &.active {
    color: white;
    background-color: grey;
  }
`;
