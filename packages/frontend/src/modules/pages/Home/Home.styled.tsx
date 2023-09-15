import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '../../theme';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${COLORS.backgroundLG}; 
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${COLORS.black}; 
  margin-bottom: 16px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.darkGray}; 
  text-align: center;
  max-width: 600px;
`;

export const LinkStart = styled(Link)`
  background-color: ${COLORS.blueColor}; 
  color: ${COLORS.white};
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${COLORS.lightBlue};
  }
`;
