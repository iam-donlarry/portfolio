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
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 40px;
    width: auto;
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
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
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
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette?.primary?.main || '#CBACF9'};
  }

  &.active {
    color: ${({ theme }) => theme.palette?.primary?.main || '#CBACF9'};
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      background-color: ${({ theme }) => theme.palette?.primary?.main || '#CBACF9'};
      border-radius: 50%;
    }
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.75rem 1rem;
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)'};
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette?.text?.primary || '#333333'};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)'};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const RightAligned = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto; /* Push to the right */
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette?.text?.primary || '#333333'};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette?.primary?.light || '#E0CFFC'};
  }
`;

export {
  Nav,
  Logo,
  NavMenu,
  NavItem,
  NavLink,
  MobileMenuButton,
  ThemeToggle,
  RightAligned
};
