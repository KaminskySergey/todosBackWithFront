/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React from 'react';
import { SliderButtonProps } from './SliderButton.props';
import { SliderButtonPrivat } from './SliderButton.styled';

const SliderButtonPrivate: React.FC<SliderButtonProps> = ({
  isCompleted,
  isPrivate,
  onClick,
  ...props
}) => {
  return (
    <SliderButtonPrivat
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
      ></div>
    </SliderButtonPrivat>
  );
};

export default SliderButtonPrivate;
