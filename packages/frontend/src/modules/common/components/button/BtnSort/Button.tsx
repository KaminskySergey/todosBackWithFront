import React from 'react';
import { ButtonProps } from './Button.props';
import { ButtonBase } from './Button.styled';

const Button: React.FC<ButtonProps> = ({ children, name, active, ...props }) => {
  const { ref, ...restProps } = props;

  return <ButtonBase {...restProps}>{children}</ButtonBase>;
};

export default Button;
