import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { spacing } from '../../theme';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${spacing(16)};
  z-index: ${({ theme }) => (theme.zIndex && theme.zIndex.appBar) ? theme.zIndex.appBar : 1100};
  transition: all ${({ theme }) => (theme.transition && theme.transition.duration && theme.transition.duration.standard) ? 
    `${theme.transition.duration.standard}ms` : '300ms'} 
    ${({ theme }) => (theme.transition && theme.transition.timing && theme.transition.timing.easeInOut) ? 
    theme.transition.timing.easeInOut : 'cubic-bezier(0.4, 0, 0.2, 1)'};
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &.scrolled {
    background-color: ${({ theme }) => (theme.palette && theme.palette.background && theme.palette.background.default) ? 
      theme.palette.background.default : '#f8f9fa'};
    box-shadow: ${({ theme }) => (theme.shadows && theme.shadows[2]) ? theme.shadows[2] : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'};
    height: ${spacing(16)};
  }
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 ${spacing(6)};
  max-width: ${({ theme }) => (theme.breakpoints && theme.breakpoints.values && theme.breakpoints.values.lg) ? 
    `${theme.breakpoints.values.lg}px` : '1200px'};
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.values?.md || 900}px) {
    justify-content: space-between;
    width: 100%;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.default || '"Work Sans", sans-serif'};
  font-weight: ${({ theme }) => theme.typography?.fontWeightBold || 700};
  color: ${({ theme }) => theme.palette?.primary?.main || '#5271ff'};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.palette?.primary?.dark || '#3a5ef5'};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing(4)};
  
  /* Desktop styles - always visible */
  @media (min-width: ${({ theme }) => (theme.breakpoints?.values?.md || 900) + 1}px) {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    pointer-events: auto !important;
    position: static !important;
    width: auto !important;
    height: auto !important;
    background-color: transparent !important;
    padding: 0 !important;
    box-shadow: none !important;
    flex-direction: row !important;
  }
  
  /* Mobile styles */
  @media (max-width: ${({ theme }) => theme.breakpoints?.values?.md || 900}px) {
    position: fixed;
    top: ${spacing(16)};
    left: 0;
    width: 100%;
    height: calc(100vh - ${spacing(16)});
    background-color: ${({ theme }) => theme.palette?.background?.paper || '#ffffff'};
    flex-direction: column;
    padding: ${spacing(4)};
    box-shadow: ${({ theme }) => theme.shadows?.[4] || '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'};
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    z-index: ${({ theme }) => theme.zIndex?.modal || 1300};
    justify-content: center;
    align-items: center;
    gap: ${spacing(8)};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme, active }) => 
    active === 'true' 
      ? (theme.palette?.primary?.main || '#5271ff')
      : (theme.palette?.text?.primary || '#2d3748')};
  font-weight: ${({ theme }) => theme.typography?.fontWeightMedium || 500};
  text-decoration: none;
  padding: ${spacing(2)} ${spacing(3)};
  border-radius: ${({ theme }) => (theme.shape?.borderRadius || 4)}px;
  transition: all ${({ theme }) => 
    (theme.transition?.duration?.standard || 300)}ms 
    ${({ theme }) => 
      theme.transition?.timing?.easeInOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};
  cursor: pointer;
  font-size: 1.1rem;
  
  &:hover {
    color: ${({ theme }) => theme.palette?.primary?.main || '#5271ff'};
    background-color: ${({ theme }) => 
      theme.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)'};
  }
  
  @media (max-width: ${({ theme }) => 
    (theme.breakpoints?.values?.md || 900)}px) {
    width: 100%;
    max-width: 300px;
    text-align: center;
    padding: ${spacing(3)} ${spacing(4)};
    font-size: 1.25rem;
    margin: ${spacing(1)} 0;
    border: 1px solid ${({ theme }) => theme.palette?.divider || '#e2e8f0'};
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: ${({ theme }) => theme.palette?.primary?.main || '#5271ff'};
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${spacing(2)} ${spacing(3)};
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex?.modal + 1 || 1400};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${({ theme }) => theme.palette?.primary?.dark || '#3a5ef5'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.values?.md || 900}px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: ${spacing(2)};
    right: ${spacing(2)};
    width: 48px;
    height: 48px;
    border-radius: 50%;
    z-index: ${({ theme }) => theme.zIndex?.modal + 1 || 1400};
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette?.text?.primary || '#2d3748'};
  font-size: ${({ theme }) => theme.typography?.h5?.fontSize || '1.25rem'};
  cursor: pointer;
  margin-left: ${({ theme }) => (theme.spacing && theme.spacing[2]) ? theme.spacing[2] : '8px'};
  padding: ${({ theme }) => (theme.spacing && theme.spacing[2]) ? theme.spacing[2] : '8px'};
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)'};
    transform: rotate(30deg);
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme.spacing && theme.spacing[3]) ? theme.spacing[3] : '16px'};
  margin-left: ${({ theme }) => (theme.spacing && theme.spacing[4]) ? theme.spacing[4] : '24px'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.values?.md || 900}px) {
    margin: ${({ theme }) => (theme.spacing && theme.spacing[4]) ? `${theme.spacing[4]}px 0 0` : '24px 0 0'};
    justify-content: center;
    width: 100%;
  }
`;

export const SocialIcon = styled.a`
  color: ${({ theme }) => theme.palette?.text?.secondary || '#4a5568'};
  font-size: ${({ theme }) => theme.typography?.h5?.fontSize || '1.25rem'};
  transition: color 0.2s ease, transform 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.palette?.primary?.main || '#5271ff'};
    transform: translateY(-2px);
  }
`;

export const ScrollTopButton = styled(motion.button)`
  position: fixed;
  bottom: ${spacing(6)};
  right: ${spacing(6)};
  width: ${spacing(10)};
  height: ${spacing(10)};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette?.primary?.main || '#5271ff'};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows?.[4] || '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'};
  transition: all 0.2s ease;
  z-index: ${({ theme }) => theme.zIndex?.tooltip || 1500};
  
  &:hover {
    background-color: ${({ theme }) => theme.palette?.primary?.dark || '#3a5ef5'};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows?.[6] || '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;
