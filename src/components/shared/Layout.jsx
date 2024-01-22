/* eslint-disable react/prop-types */
import styled from 'styled-components';

import { Navbar } from '../header/Navbar';
import { Footer } from '../footer/Footer';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

function Layout({ children }) {
  return (
    <Div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Div>
  );
}

export default Layout;
