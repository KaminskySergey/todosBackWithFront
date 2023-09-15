import styled from 'styled-components';
import { ButtonProps } from './Button.props';
import { COLORS } from '../../../../theme';

export const ButtonBase = styled.button<ButtonProps>`
  padding: 4px 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: ${COLORS.white};

  background-color: ${(p) => {
    switch (p.color) {
      case 'blue':
        return `${COLORS.blueColor}`;
      case 'red':
        return `${COLORS.redColor}`;
      case 'green':
        return `${COLORS.greenColor}`;
      case 'aqua':
        return `${COLORS.aquaDark}`;
      default:
        return `${COLORS.blueColor}`;
    }
  }};
  &:hover {
    background-color: ${(p) => {
      switch (p.color) {
        case 'blue':
          return `${COLORS.blueColor}`;
        case 'red':
          return `${COLORS.redColor}`;
        case 'green':
          return `${COLORS.greenColor}`;
        case 'aqua':
        return `${COLORS.aquaDark}`;
        default:
          return `${COLORS.blueColor}`;
      }
    }};
  }
  outline: ${(p) => (p.outline === 'sort' ? '1px solid yellow' : 'none')};
   
  &.active {
    /* Ваши стили для активной кнопки */
    /* Например, можно установить фоновый цвет или другие стили */
    background-color: black; /* Замените на свой цвет */
  }

  @media (max-width: 767px) {
    padding: 4px 8px;
    font-size: 16px;
  }

  @media (min-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;
