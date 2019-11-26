import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Header, Content, ButtonRegister, Footer } from './style';

const Home = () => (
  <Container>
    <Header>
      <div>
        <h3>Brand</h3>
        <nav className="nav nav-masthead justify-content-center">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </Header>

    <Content>
      <h1>Welcome to our App!</h1>
      <p>
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced
        below for those interested.
      </p>{' '}
      <ButtonRegister to="/register">Get started now!</ButtonRegister>
    </Content>

    <Footer>
      <div className="inner">
        <p>ReactJS &copy; {new Date().getFullYear()}</p>
      </div>
    </Footer>
  </Container>
);

export default Home;
