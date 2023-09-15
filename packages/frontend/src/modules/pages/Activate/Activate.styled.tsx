import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: ${COLORS.darkWhite};
  border-radius: 5px;
  box-shadow: 0 0 10px ${COLORS.rgb};
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.blueColor};
  font-weight: bold;
`;
