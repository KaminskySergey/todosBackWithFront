import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useUserQuery } from '../../hooks/useUserQuery';
import { Container, ContentContainer, LoginLink } from './Activate.styled';

const Activate = () => {
  const { link } = useParams();
  const { activate } = useUserQuery();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (link) {
          await activate.mutate(link);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    fetchData();
  }, [link]);

  return (
    <Container>
      <ContentContainer>
        <h2>Ваш обліковий запис активовано!</h2>
        <p>
          Тепер ви можете перейти до сторінки логіну, щоб увійти:
          <br />
          <LoginLink to="/login">Залогінитися</LoginLink>
        </p>
      </ContentContainer>
    </Container>
  );
};

export default Activate;
