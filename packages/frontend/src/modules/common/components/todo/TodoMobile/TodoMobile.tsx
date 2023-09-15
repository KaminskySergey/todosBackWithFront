import React from 'react';
import { Link } from 'react-router-dom';
import { TodoMobileProps } from './TodoMobile.props';
import { Item, List, Title } from './TodoMobile.styled';
import { ListButton } from '../TodoDesktop/TodoDesktop.styled';
import { ButtonTablet } from '../TodoTablet/TodoTablet.styled';
import SliderButtonCompleted from '../../button/BtnSlider/SliderButton';

const TodoMobile = ({
  todos,
  mutation,
  updateTodoComplited,
  user,
  isFetching,
}: TodoMobileProps): JSX.Element => (
  <>
    <List>
      {todos.map((el) => (
        <Item key={el.id}>
          <Title>{el.title}</Title>
          <div style={{ minHeight: '50px', marginBottom: '8px' }}>
            <p style={{ overflowWrap: 'break-word' }}>{el.description}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListButton style={{ display: 'flex' }}>
              <li>
                <ButtonTablet color="green">
                  <Link to={`/todos/${el.id}`}>View</Link>
                </ButtonTablet>
              </li>
              {user && (

              <li>
                <ButtonTablet color="red" onClick={() => mutation(el.id)}>
                  delete
                </ButtonTablet>
              </li>
            )}
            </ListButton>
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
              <p>{el.isCompleted ? 'Complited' : 'NotComplited'}</p>
            )}
            </div>
          </div>
        </Item>
    ))}
    </List>
  </>

);

export default TodoMobile;
