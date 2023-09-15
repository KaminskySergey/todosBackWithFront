import styled from 'styled-components';
import { COLORS } from '../../../theme';

export const UserModalContainer = styled.div`
  width: 400px;
  height: 300px;
  background-color: ${COLORS.darkWhite};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px ${COLORS.rgb};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserInfo = styled.div`
  margin-bottom: 16px;
  text-align: center;

  p {
    margin: 8px 0;
  }
`;

export const ChangePasswordButton = styled.button`
  background-color: ${COLORS.blueColor};
  color: ${COLORS.white};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${COLORS.lightBlue};
  }
`;

export const Message = styled.p`
  font-weight: bold;
  margin-top: 16px;
  text-align: center;
`;
