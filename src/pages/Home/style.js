import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 42em;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1rem;
`;

export const Header = styled.header`
  display: block;
  margin-bottom: auto;
  > div {
    h3 {
      float: left;
    }
    nav {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      float: right;
      a {
        margin-right: 1.3rem;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  @media (max-width: 568px) {
    padding: 0 0.5rem;
  }
  text-align: center;
  > p {
    margin: 2rem 0;
  }
`;

export const Footer = styled.footer`
  display: block;
  margin-top: auto;
  text-align: center;
`;

export const ButtonRegister = styled(Link)`
  background-color: #0070c9;
  padding: 1rem 2rem;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  font-weight: bold;
  width: 33%;
  margin: 0 auto;
  @media (max-width: 568px) {
    width: 100%;
  }
`;
