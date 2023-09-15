import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 425px) {
    margin-top: 8px;
  }

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;
