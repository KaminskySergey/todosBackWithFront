import { ErrorMessage, Field } from 'formik';
import styled from 'styled-components';
import { COLORS } from '../../theme';

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid ${COLORS.darkWhiteBorder};
  border-radius: 5px;
  color: ${COLORS.black};
`;

export const ErrorMessageText = styled(ErrorMessage)`
  color: ${COLORS.red};
  font-size: 8px;
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  background-color: ${COLORS.blueColor};
  color: ${COLORS.white};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.lightBlue};
  }
`;
