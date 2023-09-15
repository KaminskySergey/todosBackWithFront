import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '../../../theme';

export const HeadCont = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: ${COLORS.backgroundLGWithDark};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  padding: 16px;
`;

export const BtnProfile = styled.button`
  background-color: green;
  padding: 8px 4px;
  border-radius: 8px;
  border: none;
  width: 90px;
  
`;

export const LogoutButton = styled.button`
  margin-left: 24px;
  background-color: red;
  padding: 8px 4px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  @media(max-width: 425px){
    margin-left: 8px;
  }
`;

export const LinkNav = styled(Link)`
text-decoration: none;
  padding: 10px 20px;
  margin-right: 10px; 
  background-color: ${COLORS.greenColor}; 
  color: ${COLORS.white}; 
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${COLORS.lightBlue};
  }

  @media(max-width: 425px) {
    padding: 8px 8px;
  }
`;
