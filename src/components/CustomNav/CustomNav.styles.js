import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;

const Logo = styled(ScrollLink)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette?.text?.primary || '#333333'};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette?.primary?.main || '#4a6cf7'};
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(ScrollLink)`
  color: ${({ theme }) => theme.palette?.text?.primary || '#333333'};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette?.primary?.main || '#4a6cf7'};
  }

  &.active {
    color: ${({ theme }) => theme.palette?.primary?.main || '#4a6cf7'};
    font-weight: 600;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.palette?.text?.primary || '#333333'};
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

export { Nav, Logo, NavMenu, NavItem, NavLink, MobileMenuButton };
