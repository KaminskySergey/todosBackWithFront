import styled from 'styled-components';
import { COLORS } from '../../../theme';

export const Backdrop = styled.div<any>`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  position: absolute;
  max-width: 95%;
  /* padding: 48px 18px 40px; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${COLORS.white};
  box-shadow: 3px 8px 14px rgba(136, 198, 253, 0.19);
  border-radius: 40px;

  /* @media (min-width: 375px) {
    width: 300px;
    height: 50%; 
  }
  @media (max-width: 1279px) {
    
  }
  @media (min-width: 768px) {
    width: 396px;
    height: 360px;
    padding: 40px 28px;
  } */
`;

export const CloseModal = styled.button`
  position: absolute;
  top: 19px;
  right: 19px;
  transition: all 250ms;
  cursor: pointer;
`;
