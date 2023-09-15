/* eslint-disable react/jsx-no-useless-fragment */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  ListButton,
} from './TodoDesktop.styled';
import { TodoDesktopProps } from './TodoDesktop.props';
import Button from '../../button/BtnSort/Button';
import SliderButtonCompleted from '../../button/BtnSlider/SliderButton';

const TodoDesktop = ({
  todos,
  mutation,
  updateTodoComplited,
  user,
  isFetching
}: TodoDesktopProps): JSX.Element => (
  <>
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>Todo Title</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </tr>
      </TableHeader>
      <tbody>
        {todos?.map((el) => (
          <TableRow key={el.id}>
            <TableCell>{el.title}</TableCell>
            <TableCell>{el.description}</TableCell>
            <TableCell
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '68px'

              }}
            >
              <div style={{ marginRight: '16px' }}>
                <ListButton style={{ display: 'flex' }}>
                  <li>
                    <Button color="green" style={{ width: '58px', height: '32px' }}>
                      <Link to={`/todos/${el.id}`}>View</Link>
                    </Button>
                  </li>
                  {user && (
                    <li>
                      <Button
                        color="red"
                        style={{ width: '58px', height: '32px' }}
                        onClick={() => mutation(el.id)}
                      >
                        delete
                      </Button>
                    </li>
                  )}
                </ListButton>
              </div>
              <div>
                {user ? (
                  <SliderButtonCompleted
                    onClick={() => {
                    if (!isFetching) {
                      updateTodoComplited(el.id, !el.isCompleted);
                    }
                  }}
                    isCompleted={el.isCompleted}
                  />
                ) : (
                  <div>{el.isCompleted ? 'Complited' : 'NotComplited'}</div>
                )}

              </div>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  </>
);

export default TodoDesktop;
