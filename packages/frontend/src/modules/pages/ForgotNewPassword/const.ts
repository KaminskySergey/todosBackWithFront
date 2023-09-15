import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('required')
});

export const initValue = {
  password: '',
  confirmPassword: ''
};
