import styled from 'styled-components';

import { Button } from './Button';

const FormWrap = styled.div`
  min-width: 350px;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Span = styled.span`
  color: #f00;
  font-size: 14px;
`;

const FormButton = styled(Button)`
  background-color: #1c64f2;
  padding: 10px 20px;
  border-radius: 8px;
  gap: 8px;
  align-self: start;
`;

export { FormWrap, Row, Span, FormButton };
