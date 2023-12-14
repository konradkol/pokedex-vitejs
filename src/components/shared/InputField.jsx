/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
`;
const StyledInput = styled.input`
  padding: 14px 16px;
  border: 1px solid #4b5563;
  border-radius: 8px;
  background-color: #374151;
  color: #9ca3af;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #9ca3af;
  }
`;

export const InputField = ({
  label,
  htmlFor,
  as,
  type,
  placeholder,
  id,
  name,
  children,
}) => {
  return (
    <StyledLabel htmlFor={htmlFor}>
      {label}
      <StyledInput
        as={as}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
      {children}
    </StyledLabel>
  );
};
