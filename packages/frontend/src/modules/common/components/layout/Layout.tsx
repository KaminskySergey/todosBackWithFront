import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle

// eslint-disable-next-line import/no-cycle
import Header from '../header/Header';
import { Box, Main } from './Layout.styled';

const Layout = (): JSX.Element => (
  <div>
    <Header />
    <Main>
      <Box>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
    </Main>
  </div>
);

export default Layout;
