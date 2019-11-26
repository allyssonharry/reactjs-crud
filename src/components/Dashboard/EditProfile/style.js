import styled from 'styled-components';

export const Form = styled.form``;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 1rem + 1px);
  padding: 0.75rem;
  font-weight: normal;
  line-height: 1.5;
  color: #495057;
  background-color: #efefef;
  background-clip: padding-box;
  border: 0;
  border-radius: 4px;
  transition: all 0.2s ease-out;
  margin-bottom: 0;
  @media (min-width: 992px) {
    width: 25%;
  }
`;

export const InputError = styled.p`
  font-size: 11px;
  color: #b11;
`;

export const HeadingTitle = styled.h2`
  margin-bottom: 1rem;
  font-weight: normal;
`;
