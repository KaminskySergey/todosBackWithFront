import React from 'react';
import { Description, HomeContainer, LinkStart, Title } from './Home.styled';

const Home = () => (
  <HomeContainer>
    <Title>Ласкаво просимо на головну сторінку</Title>
    <Description>
      Це красива домашня сторінка, де ви можете керувати своїм часом!
    </Description>
    <LinkStart to="/login">Почати</LinkStart>
  </HomeContainer>
  );

export default Home;
