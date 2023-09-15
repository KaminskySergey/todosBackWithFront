import { Field } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../theme';

export const Title = styled.h2`
  font-family: 'ManropeMedium';
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    font-size: 36px;
    line-height: 49px;
    letter-spacing: 0.04em;
  }
`;

export const Label = styled.label`
  font-family: 'ManropeSemiBolt';
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  & + & {
    margin-top: 24px;
  }
  @media (min-width: 768px) {
    & + & {
      margin-top: 32px;
    }
  }
`;

export const Input = styled(Field)`
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid ${COLORS.lightBlue};
  border-radius: 40px;
  letter-spacing: 0.04em;
  font-family: 'ManropeMedium';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;

  color: ${COLORS.black};
`;

export const Button = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 28px;
  background: ${COLORS.lightBlue};
  border: none;
  cursor: pointer;
  border-radius: 40px;
  margin-top: 40px;
  font-family: 'ManropeSemiBolt';
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  transition: all 250ms;
  letter-spacing: 0.04em;
  &:hover,
  &:focus {
    background-color: ${COLORS.darkBlue};
  }
  /* Белый */

  color: ${COLORS.white};
  @media (min-width: 768px) {
    margin-top: 60px;
  }
`;
export const Text = styled.p`
  font-family: 'ManropeMedium';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  color: ${COLORS.darkGray};
  span {
    margin-left: 4px;
    color: ${COLORS.lightBlue};
    text-decoration: underline;
    transition: all 250ms;
    &:hover,
    &:focus {
      color: ${COLORS.darkBlue};
    }
  }
`;

export const LinkChange = styled(Link)`
  margin-left: 4px;
  color: ${COLORS.lightBlue};
  text-decoration: underline;
  transition: all 250ms;
  &:hover,
  &:focus {
    color: ${COLORS.darkBlue};
  }
`;

export const LinkForgot = styled(Link)`
  color: ${COLORS.black};
  text-decoration: underline;
`;

export const ErrorMessage = styled.div`
  color: ${COLORS.red};
  font-size: 10px;
  margin-bottom: 12px;
`;
