import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import history from '../../../services/history';
import { validateEmail } from '../../../utils';

import { Storage } from '../../../storage/Storage';
import {
  REQUEST_SUCCESS,
  EMPTY_DATA,
  USER_AUTH_CHANGE,
} from '../../../actions/types';

import { Container, Form, Input, ButtonRegister, InputError } from './style';

class Login extends Component {
  state = {
    errors: [],
    isLoading: false,
    reqInputs: {
      email: '',
      password: '',
    },
  };

  onChangeText = e => {
    if (!e) return;
    const { reqInputs } = this.state;

    reqInputs[e.target.name] = e.target.value;
    this.setState({ errors: [] });
  };

  formSubmit = e => {
    e.preventDefault();
    const { eventEmitter } = this.props;
    const { isLoading, reqInputs } = this.state;

    if (isLoading) return;

    const keysFromInputs = Object.keys(reqInputs);

    this.validate(keysFromInputs, reqInputs, (status, response) => {
      if (status) {
        this.setState({
          errors: [],
          isLoading: true,
        });

        Storage.login(reqInputs, status => {
          if (status === EMPTY_DATA) {
            Swal.fire({
              title: 'Error...',
              text: 'Email or Password is incorrect.',
              type: null,
              heightAuto: false,
            });
          }
          if (status === REQUEST_SUCCESS) {
            eventEmitter.emit(USER_AUTH_CHANGE, {
              isLoggedIn: true,
            });
            history.push('/dashboard');
          }
          this.setState({ isLoading: false });
        });
      } else {
        this.setState({
          errors: response,
        });
      }
    });
  };

  errors = key => {
    const { errors } = this.state;

    const index = errors.findIndex(field => field.fieldName === key);
    if (index === -1) return {};

    return errors[index];
  };

  validate = (keys, req, res) => {
    if (!keys || (keys && !keys.length)) return;

    let emptyKeys = [];

    keys.forEach(field => {
      if (field === 'email') {
        if (req[field] && !validateEmail(req[field])) {
          emptyKeys.push({
            fieldName: field,
            message: 'Email is not valid.',
          });
        }
      }
      if (!req[field]) {
        const index =
          emptyKeys && emptyKeys.length
            ? emptyKeys.findIndex(field => field.fieldName === field)
            : -1;
        if (index === -1) {
          emptyKeys.push({
            fieldName: field,
            message: 'The field is required',
          });
        }
      }
    });

    if (res) {
      res(!emptyKeys.length, emptyKeys);
    }
  };

  btnSubmitText = () => {
    const { isLoading } = this.state;
    return isLoading ? 'Working...' : 'Login';
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.formSubmit} method="post">
          <h1>Log in</h1>
          <h5>Create an account first if it does not exist.</h5>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
            onChange={this.onChangeText}
          />
          <InputError>{this.errors('email').message}</InputError>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            onChange={this.onChangeText}
          />
          <InputError>{this.errors('password').message}</InputError>

          <button type="submit">{this.btnSubmitText()}</button>

          <br />
          <br />

          <ButtonRegister to="/register">Don't have an account?</ButtonRegister>
        </Form>
      </Container>
    );
  }
}

export default Login;

Login.propTypes = {
  eventEmitter: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
