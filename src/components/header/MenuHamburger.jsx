import { useState } from 'react';
import { TiThMenu } from 'react-icons/ti';
import styled from 'styled-components';

const Div = styled.div`
  flex-direction: column;
  ${(props) => (props.$show ? { display: 'flex' } : { display: 'none' })}
`;

const MenuHamburger = ({ className, children, isShow, setIsShow }) => {
  const toggleMenu = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <Div
      $show={true}
      className={`${className} ${isShow && 'show'}`}
      onClick={toggleMenu}
    >
      <TiThMenu />
      <Div $show={isShow}>{children}</Div>
    </Div>
  );
};

export default MenuHamburger;
