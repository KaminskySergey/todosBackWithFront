import styled from 'styled-components';
import Button from '../../button/BtnSort/Button';
import { COLORS } from '../../../../theme';

export const Card = styled.div`
  padding: 12px 16px;
  width: 300px;
  height: 300px;
  background: ${COLORS.backgroundLG};
  border-radius: 16px;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

export const ButtonTablet = styled(Button)`
  height: 32px;
  width: 64px;
  font-size: 14px;
`;
