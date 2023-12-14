import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useRegisterAndLoginUser from '../../hooks/useRegisterAndLoginUser';

import { InputField } from '../shared/InputField';
import { FormWrap, Row, Span, FormButton } from '../shared/forFormComponents';

export const RegisterFormFormik = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Pole "Name" jest wymagane.'),
    email: Yup.string()
      .email('Niepoprawny format adresu email.')
      .required('Pole "Email" jest wymagane.'),
    password: Yup.string()
      .min(8, 'Hasło musi mieć co najmniej 8 znaków')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny',
      )
      .required('Pole "Password" jest wymagane.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Hasła muszą być identyczne')
      .required('Pole "Confirm password" jest wymagane.'),
  });

  const handleSubmit = useRegisterAndLoginUser(
    'users',
    'Konto zostalo utworzone.',
    'Nie udalo sie utworzyc konta.',
    '/login',
    'forRegister',
  );

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormWrap>
        <Form>
          <Row>
            <InputField
              as={Field}
              htmlFor="name"
              label="Name"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
            >
              <ErrorMessage name="name" component={Span} />
            </InputField>

            <InputField
              as={Field}
              htmlFor="email"
              label="Email"
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
            >
              <ErrorMessage name="email" component={Span} />
            </InputField>
            <InputField
              as={Field}
              htmlFor="password"
              label="Password"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            >
              <ErrorMessage name="password" component={Span} />
            </InputField>
            <InputField
              as={Field}
              htmlFor="confirmPassword"
              label="ConfirmPassword"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
            >
              <ErrorMessage name="confirmPassword" component={Span} />
            </InputField>
            <FormButton type="submit">Create Account</FormButton>
          </Row>
        </Form>
      </FormWrap>
    </Formik>
  );
};
