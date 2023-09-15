/* eslint-disable prettier/prettier */
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface SliderButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  ref?: any;
  isCompleted?: boolean;
  isPrivate?: boolean;
  onClick?: () => void;
}
