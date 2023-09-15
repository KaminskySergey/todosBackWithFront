/* eslint-disable prettier/prettier */

import { Formik, Form, useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Label, Title } from '../CreateTodo.styled';
import { CreateContainerProps } from './CreateTodo.props';
import CreateContainer from '../createContainer/CreateContainer';
import SliderButtonCompleted from '../../button/BtnSlider/SliderButton';
import { formikValue } from './const';
import todoService from '../../../../../service/todoService';
import { ErrorMessage } from '../../../../pages/Register/Register.styled';

export const TodoValidSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  isCompleted: Yup.boolean().required('Required')

});

const CreateTodo = ({ onClose }: CreateContainerProps): JSX.Element => {
  const [isCompleted, setIsCompleted] = useState(false);
  const client = useQueryClient();

  const mutate = useMutation({
    mutationFn: todoService.createTodoForm,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] });
    }

  });

  const handleTogglePrivat = (): void => {
    setIsCompleted((pS) => !pS);
  };

  const handleFormSubmit = async (values: any) => {
    try {
      await mutate.mutateAsync({ ...values, isCompleted });
      // eslint-disable-next-line no-console
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      formik.resetForm();
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create todo:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      isCompleted,
      isPrivate: false
    },
    validationSchema: TodoValidSchema,
    onSubmit: handleFormSubmit
  });

  return (
    <CreateContainer>
      <Title>Create Todo</Title>
      <Formik initialValues={formikValue} onSubmit={handleFormSubmit}>
        <Form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          }}
        >
          <Label>
            <Input
              name="title"
              type="title"
              placeholder="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            />
          </Label>
          {formik.errors && formik.touched.title && (
            <ErrorMessage>{formik.errors.title}</ErrorMessage>
          )}

          <Label>
            <Input
              name="description"
              type="description"
              placeholder="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
            />
          </Label>
          {formik.errors && formik.touched.description && (
            <ErrorMessage>{formik.errors.description}</ErrorMessage>
          )}

          <Label style={{ display: 'flex', justifyContent: 'space-between' }}>
            isCompleted:
            <SliderButtonCompleted
              type="button"
              isCompleted={isCompleted}
              onClick={handleTogglePrivat}
            />
          </Label>

          <Button type="submit">Create</Button>
        </Form>
      </Formik>
    </CreateContainer>

  );
};

export default CreateTodo;
