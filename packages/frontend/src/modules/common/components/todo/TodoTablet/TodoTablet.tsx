/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TodoTabletProps } from './TodoTablet.props';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ListButton } from '../TodoDesktop/TodoDesktop.styled';
import { Card, ButtonTablet } from './TodoTablet.styled';
import { Link } from 'react-router-dom';
import SliderButtonCompleted from '../../button/BtnSlider/SliderButton';

interface SwiperData {
  activeIndex: number;
  slides: any[];
}

const TodoTablet = ({
  todos,
  mutation,
  updateTodoComplited,
  user,
  isFetching,
  setCurrentPage,
  page,
  pagination,
  search,
  status,
}: TodoTabletProps): JSX.Element => {
  const { totalPages } = pagination || {};
  const [items, setItems] = useState(todos);

  useEffect(() => {
    setItems(todos);
  }, [page, status, search]);

  useEffect(() => {
    if (page === 1) {
      setItems(todos);
    } else {
      const newItems = todos.filter((todo) => !items.some((item) => item.id === todo.id));
      setItems((prevItems) => [...prevItems, ...newItems]);
    }
  }, [todos]);

  const handleChange = (el: SwiperData) => {
    if (!totalPages) {
      return;
    }
    if (el.activeIndex === el.slides.length - 1 && page < totalPages) {
      setCurrentPage(page + 1);
    }
  };
  return (
    <div className="swiper-container" style={{ display: 'flex', justifyContent: 'center' }}>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        pagination
        modules={[EffectCoverflow, Pagination]}
        onUpdate={(swiper) => {
          if (swiper.activeIndex !== 0 && page === 1) {
            swiper.slideTo(0);
          }
        }}
        onSlideChange={handleChange}
      >
        {items?.map((el, index) => (
          <SwiperSlide key={`${el.id}-${index}`}>
            <Card>
              <h2>{el.title}</h2>
              <div>
                <div style={{ width: '100%', height: '164px' }}>
                  <p style={{ wordWrap: 'break-word' }}>{el.description}</p>
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
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default TodoTablet;
