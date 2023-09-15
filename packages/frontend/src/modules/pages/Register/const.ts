import * as Yup from 'yup';

export const initValueForm = {
  name: '',
  email: '',
  password: ''
};

export const UserValidSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не может содержать больше 50 символов')
    .required('Имя обязательное поле'),
  email: Yup.string()
    .email('Некорректный адрес электронной почты')
    .required('Адрес электронной почты обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен')
});
