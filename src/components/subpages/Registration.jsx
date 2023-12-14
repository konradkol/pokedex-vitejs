import Layout from '../shared/Layout';
import { Container } from '../shared/Container';

import { RegisterFormFormik } from '../main/RegisterFormFormik';

function Registration() {
  return (
    <Layout>
      <Container $column>
        <h1>Hear, you can register your account</h1>
        <RegisterFormFormik />
      </Container>
    </Layout>
  );
}

export default Registration;
