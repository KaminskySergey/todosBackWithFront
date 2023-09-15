import * as Yup from 'yup';

export const initValue = {
  currentPassword: '',
  newPassword: '',
  token: ''
};

export const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
});
