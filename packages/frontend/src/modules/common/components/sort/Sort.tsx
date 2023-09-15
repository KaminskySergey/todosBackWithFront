import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import { Item, List, SortCont, Input } from './Sort.styled';
import Button from '../button/BtnSort/Button';
import { initValue, sortInfo } from './const';
import { SortProps } from './Sort.props';
import { ButtonBase } from '../button/BtnSort/Button.styled';
// eslint-disable-next-line import/no-cycle
import { TokenContext } from '../../../navigation';

const Sort = ({ onFilterChange, setSearchParams, search, status, handleClearFilters }: SortProps): JSX.Element => {
  const { token } = useContext(TokenContext);

  return (
    <SortCont>
      <List>
        {sortInfo.map((el) => (
        (el.name === 'Private' || el.name === 'Completed') && !token ? null : (
          <Item key={el.id}>
            <Button
              className={status === el.name ? 'active' : ''}
              color="blue"
              name="sort"
              outline="sort"
              type="button"
              onClick={() => {
    setSearchParams({ search, status: el.name });
                onFilterChange(el.name);
  }}
            >
              {el.name}
            </Button>
          </Item>
    )
      ))}
      </List>

      <div>
        <Formik
          initialValues={initValue}
          onSubmit={() => {}}
        >
          {({ values, handleChange }) => (
            <Form style={{ display: 'flex', alignItems: 'center' }}>
              <Input
                type="text"
                name="search"
                value={values.search}
                onChange={(e) => {
                handleChange(e);
          setSearchParams({ search: e.target.value || '', status });
        }}
              />
              <ButtonBase color="aqua" type="button" onClick={handleClearFilters}>Clear filters</ButtonBase>
            </Form>
  )}
        </Formik>
      </div>
    </SortCont>
  );
};

export default Sort;
