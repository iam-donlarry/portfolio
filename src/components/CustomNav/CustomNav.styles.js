import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background: rgba(3, 0, 20, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  &.scrolled {
    padding: 0.3rem 2rem;
    background: rgba(3, 0, 20, 0.8);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  }
`;

const Logo = styled(ScrollLink)`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 40px;
    width: auto;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    background: rgba(3, 0, 20, 0.95);
    backdrop-filter: blur(15px);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    gap: 2rem;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(ScrollLink)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #CBACF9;
    text-shadow: 0 0 10px rgba(203, 172, 249, 0.5);
  }

  &.active {
    color: #CBACF9;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #CBACF9, transparent);
      border-radius: 2px;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const RightAligned = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export {
  Nav,
  Logo,
  NavMenu,
  NavItem,
  NavLink,
  MobileMenuButton,
  RightAligned
};
