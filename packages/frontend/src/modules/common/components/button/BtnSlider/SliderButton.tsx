import React from 'react';
import { SliderButtonProps } from './SliderButton.props';
import { SliderButtonIsCompleted } from './SliderButton.styled';

const SliderButtonCompleted: React.FC<SliderButtonProps> = ({
  isCompleted,
  isPrivate,
  onClick,
  ...props
}) => (
  <SliderButtonIsCompleted
    isCompleted={isCompleted}
    isPrivate={isPrivate}
    onClick={onClick}
    {...props}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: 'white',
        borderRadius: '50%',
        margin: '0 -4px'

      }}
    />
  </SliderButtonIsCompleted>
);

export default SliderButtonCompleted;
