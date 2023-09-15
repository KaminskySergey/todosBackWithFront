/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IBasikPagination } from '../../types/student.types';

const BasicPagination = ({ pagination, handleChange }: IBasikPagination): JSX.Element => {
  const { totalPages } = pagination;

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        onChange={(event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        handleChange(page);
      }}
        color="primary"
      />
    </Stack>

    );
};

export default BasicPagination;
