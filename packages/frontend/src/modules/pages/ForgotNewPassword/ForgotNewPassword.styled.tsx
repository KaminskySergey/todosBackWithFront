import { ErrorMessage, Field } from 'formik';
import styled from 'styled-components';
import { COLORS } from '../../theme';

export const Title = styled.h1`
  color: ${COLORS.secondary};
  text-align: center;
  color: ${COLORS.blueColor};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  text-align: left;
  color: ${COLORS.lightBlueBorder};
  
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${COLORS.darkWhiteBorder};
  border-radius: 3px;
  color: ${COLORS.black};
`;

export const ErrorMessageText = styled(ErrorMessage)`
  color: ${COLORS.redColor};
  font-size: 12px;
  margin-top: 12px;
`;

export const SubmitButton = styled.button`
  background-color: ${COLORS.lightBlue};
  color: ${COLORS.white};
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: ${COLORS.lightBlueBorder};
  }
`;
