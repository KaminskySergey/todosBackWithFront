import React from 'react';
import { Container } from './CreateContainer.styled';
import { CreateContainerProps } from './CreateContainer.props';

const CreateContainer = ({ children }: CreateContainerProps) => <Container>{children}</Container>;

export default CreateContainer;
