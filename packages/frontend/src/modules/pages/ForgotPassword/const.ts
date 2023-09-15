import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректный адрес электронной почты')
    .required('Поле обязательно для заполнения')
});

export const initValue = {
  email: ''
};
