import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useRegisterAndLoginUser from '../../hooks/useRegisterAndLoginUser';

import { InputField } from '../shared/InputField';
import { FormWrap, Row, Span, FormButton } from '../shared/forFormComponents';

export const LoginFormFormik = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Pole "Name" jest wymagane.'),
    password: Yup.string().required('Pole "Password" jest wymagane.'),
  });

  const handleSubmit = useRegisterAndLoginUser(
    'users',
    '',
    '',
    null,
    'forLogin',
  );

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
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
              label="Your name"
              id="name"
              type="name"
              name="name"
              placeholder="Name"
            >
              <ErrorMessage name="name" component={Span} />
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
            <FormButton type="submit">Login</FormButton>
          </Row>
        </Form>
      </FormWrap>
    </Formik>
  );
};
