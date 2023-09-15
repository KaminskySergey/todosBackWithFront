import styled from 'styled-components';
import { COLORS } from '../../theme';

export const Todo = styled.div`
  @media (max-width: 425px) {
    padding: 4px;
  }
  padding: 8px;
  outline: '1px solid black';
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 32px;
    font-size: 18px;
    @media (min-width: 426px) {
      font-size: 22px;
    }
  }
`;

export const ContDescription = styled.div`
  height: 200px;
  background-color: ${COLORS.lightBlue};
  margin-bottom: 32px;
  padding: 12px;
  border-radius: 4px;

  h3 {
    font-size: 16px;
    @media (min-width: 426px) {
      font-size: 18px;
    }
  }
`;

export const ContPosition = styled.div`
  display: flex;
  justify-content: space-between;
`;
