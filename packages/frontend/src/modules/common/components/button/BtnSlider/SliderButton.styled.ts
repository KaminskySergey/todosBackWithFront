/* eslint-disable linebreak-style */
import styled from 'styled-components';
import { SliderButtonProps } from './SliderButton.props';

export const SliderButtonIsCompleted = styled.button<SliderButtonProps>`
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.isCompleted ? 'green' : 'red')};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isCompleted ? 'flex-end' : 'flex-start')};
  cursor: pointer;
  transition: background-color 0.9s ease;
`;

export const SliderButtonPrivat = styled.button<SliderButtonProps>`
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.isPrivate ? 'green' : 'red')};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isPrivate ? 'flex-end' : 'flex-start')};
  cursor: pointer;
  transition: background-color 0.9s ease;
`;
