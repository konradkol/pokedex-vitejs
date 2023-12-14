import Layout from '../shared/Layout';
import { Container } from '../shared/Container';

import { LoginFormFormik } from '../main/LoginFormFormik';

function Login() {
  return (
    <Layout>
      <Container $column>
        <h1>Please login</h1>
        <LoginFormFormik />
      </Container>
    </Layout>
  );
}

export default Login;
