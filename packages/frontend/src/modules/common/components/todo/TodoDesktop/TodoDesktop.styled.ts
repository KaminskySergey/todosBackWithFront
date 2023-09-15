import styled from 'styled-components';
import { COLORS } from '../../../../theme';

export const Table = styled.table`
  width: 100%;
  margin-top: 32px;
  border-collapse: collapse;
  margin-bottom: 32px;
`;

export const TableHeader = styled.thead`
  background: ${COLORS.backgroundLG};
  color: ${COLORS.white};
`;

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${COLORS.darkWhite};
  }

  &:nth-child(even) {
    background-color: ${COLORS.white};
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: ${COLORS.darkWhiteBorder};
  overflow-wrap: anywhere;
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  border: ${COLORS.darkWhiteBorder};
`;

export const ListButton = styled.ul`
  li:first-child {
    margin-right: 16px;
  }
`;
