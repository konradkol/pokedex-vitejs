import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Layout from '../shared/Layout';

const Div = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
`;

function PageNotFound() {
  return (
    <Layout>
      <Div>
        <h1>Upsss... Page not found</h1>
        <Link to="/">Wróć do strony głównej</Link>
      </Div>
    </Layout>
  );
}

export default PageNotFound;
