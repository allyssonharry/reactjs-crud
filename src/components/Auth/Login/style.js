import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #24292e;
  height: 100%;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  display: block;
  h1,
  h5 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #fff;
  }
  input {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  button {
    display: inline-block;
    margin: 0;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: white;
    background-color: #0066ff;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  line-height: 1;
  color: white;
  background-color: #2f363d;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
  -webkit-appearance: none;
  margin: 0;
  padding: 16px 16px 16px 52px;
  border-width: 0;
  outline: 0;
  border-radius: 3px;
  &:focus {
    box-shadow: 0 0 0 3px #0066ff;
  }
`;

export const ButtonRegister = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: block;
  width: 100%;
  text-align: center;
`;

export const InputError = styled.p`
  margin-bottom: 1rem;
  font-size: 13px;
  color: #f27474;
`;
