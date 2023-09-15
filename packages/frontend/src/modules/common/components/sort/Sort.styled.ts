import styled from 'styled-components';
import { COLORS } from '../../../theme';

export const SortCont = styled.div`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const List = styled.div`
  display: flex;
  margin-bottom: 8px;
  @media (min-width: 426px) {
    margin-bottom: 16px;
  }
  @media (min-width: 768px) {
    width: 164px;
    margin-bottom: 0;
  }
`;

export const Item = styled.div`
  display: inline-block;
`;

export const Input = styled.input`
  width: 164px;
  outline: 1px solid ${COLORS.black};
  margin-right: 8px;
  border-radius: 8px;
  border: none;
  @media (max-width: 350px) {
  width: 128px
}
`;
