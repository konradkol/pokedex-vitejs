/* eslint-disable react/prop-types */
// import styled from 'styled-components';

import { Navbar } from '../header/Navbar';
import { Footer } from '../footer/Footer';

// import img from '../../images/ai-generated-8355516_1920.png';

// const Wrap = styled.div`
//   background-image: url(${img});
//   background-size: auto;
//   background-repeat: no-repeat;
// `;

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
