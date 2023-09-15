import styled from 'styled-components';

import { COLORS } from '../../../../theme';

export const List = styled.ul`
  margin-top: 32px;
`;

export const Item = styled.li`
  display: flex;
  outline: 1px solid red;
  flex-direction: column;
  padding: 8px 8px;
  border-radius: 16px;
  background: ${COLORS.backgroundLG};
  & + & {
    margin-top: 16px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 18px;
`;
