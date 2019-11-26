import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import history from '../../../services/history';
import { validateEmail } from '../../../utils';

import { Storage } from '../../../storage/Storage';
import {
  REQUEST_SUCCESS,
  USER_EXISTS,
  USER_AUTH_CHANGE,
  USER_ROLE_ADMIN,
} from '../../../actions/types';

import { Container, Form, Input, ButtonLogin, InputError } from './style';

class Register extends Component {
  state = {
    errors: [],
    isLoading: false,
    reqInputs: {
      name: '',
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
    const toKeys = Object.keys(reqInputs);
    this.validate(toKeys, reqInputs, (status, response) => {
      if (status) {
        this.setState({
          errors: [],
          isLoading: true,
        });

        Storage.setUser(USER_ROLE_ADMIN, reqInputs, res => {
          if (res === USER_EXISTS) {
            Swal.fire({
              title: 'Error...',
              text: `${reqInputs.name}'s already exists.`,
              heightAuto: false,
            });
          }
          if (res === REQUEST_SUCCESS) {
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

  // Set Errors
  errors = key => {
    const { errors } = this.state;

    const index = errors.findIndex(field => field.fieldName === key);
    if (index === -1) return {};

    return errors[index];
  };

  // Validate Fields
  validate = (keys, body, res) => {
    if (!keys || (keys && !keys.length)) return;

    const emptyKeys = [];

    keys.forEach(field => {
      if (!body[field]) {
        const index =
          emptyKeys && emptyKeys.length
            ? emptyKeys.findIndex(field => field.fieldName === field)
            : -1;

        if (index === -1)
          emptyKeys.push({
            fieldName: field,
            message: 'The field is required',
          });
      }

      if (field === 'email') {
        if (body[field] && !validateEmail(body[field])) {
          emptyKeys.push({
            fieldName: field,
            message: 'Email is not valid.',
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

    return isLoading ? 'Please wait...' : 'Create';
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.formSubmit} method="post">
          <h1>Create an account</h1>
          <Input
            type="text"
            placeholder="Name"
            name="name"
            onChange={this.onChangeText}
          />
          <InputError>{this.errors('name').message}</InputError>

          <Input
            type="text"
            placeholder="Email"
            name="email"
            onChange={this.onChangeText}
          />
          <InputError>{this.errors('email').message}</InputError>

          <Input
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="password"
            onChange={this.onChangeText}
          />
          <InputError>{this.errors('password').message}</InputError>

          <button type="submit">{this.btnSubmitText()}</button>

          <ButtonLogin to="/login">Already have an account?</ButtonLogin>
        </Form>
      </Container>
    );
  }
}

export default Register;

Register.propTypes = {
  eventEmitter: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
