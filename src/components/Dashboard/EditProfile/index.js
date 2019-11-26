import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import history from '../../../services/history';
import { ucFirst, validateEmail } from '../../../utils';

import { Storage } from '../../../storage/Storage';
import {
  ADD_USER,
  EDIT_PROFILE,
  REQUEST_SUCCESS,
  USER_EXISTS,
  USER_SESSION_DATA,
  USER_ROLE_USER,
} from '../../../actions/types';

import { Form, FormGroup, Input, InputError, HeadingTitle } from './style';

class EditProfile extends Component {
  state = {
    userLoggedIn: Storage.getUser(USER_SESSION_DATA),
    isLoading: false,
    errors: [],
    reqInputs: {
      name: '',
      email: '',
      password: '',
    },
  };

  componentDidMount() {
    const {
      actionType,
      match: { params },
    } = this.props;

    if (actionType === EDIT_PROFILE) {
      Storage.getUserById(params.userId, (status, response) => {
        if (status === REQUEST_SUCCESS) {
          this.setState({
            reqInputs: {
              name: response.name,
              email: response.email,
              password: response.password,
            },
          });
        }
      });
    }
  }

  onChangeValue = e => {
    const { reqInputs } = this.state;

    reqInputs[e.target.name] = e.target.value;
    this.setState({ [e.target.name]: e.target.value, errors: [] });
  };

  formSubmit = e => {
    e.preventDefault();
    const { actionType } = this.props;

    if (actionType === ADD_USER) {
      this.addUser();
    }
    if (actionType === EDIT_PROFILE) {
      this.editUser();
    }
  };

  editUser = () => {
    const { isLoading, reqInputs } = this.state;

    if (isLoading) return;

    const toKeys = Object.keys(reqInputs);
    this.validateFields(toKeys, reqInputs, (status, res) => {
      if (status) {
        this.setState({
          errors: [],
          isLoading: true,
        });
        Storage.editUser(reqInputs, response => {
          if (response === USER_EXISTS) {
            Swal.fire('Sorry...', `${reqInputs.email} already exists!`, null);
            return;
          }
          if (response === REQUEST_SUCCESS) {
            Swal.fire({
              title: 'Done!',
              text: `${reqInputs.name}'s successfully updated!`,
              type: null,
            });

            history.push('/dashboard/users/list');
          }
          this.setState({ isLoading: false });
        });
      } else {
        this.setState({
          errors: res,
        });
      }
    });
  };

  addUser = () => {
    const { isLoading, userLoggedIn, reqInputs } = this.state;

    if (isLoading) return;

    if (userLoggedIn) {
      const toKeys = Object.keys(reqInputs);
      this.validateFields(toKeys, reqInputs, (status, response) => {
        if (status) {
          this.setState({
            errors: [],
            isLoading: true,
          });

          Storage.setUser(USER_ROLE_USER, reqInputs, res => {
            if (res === REQUEST_SUCCESS) {
              Swal.fire(
                'Success!',
                `${reqInputs.name}'s successfully created!`,
                'success'
              );

              history.push('/dashboard/users/list');
            }
            if (res === USER_EXISTS) {
              Swal.fire(
                'Error',
                `${reqInputs.name}'s already exists!`,
                'warning'
              );
            }
            this.setState({ isLoading: false });
          });
        } else {
          this.setState({
            errors: response,
          });
        }
      });
    }
  };

  errorField = key => {
    const { errors } = this.state;

    const index = errors.findIndex(field => field.fieldName === key);
    if (index === -1) return {};

    return errors[index];
  };

  validateFields = (keys, req, res) => {
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
      if (req[field]) {
        return;
      }
      const index =
        emptyKeys && emptyKeys.length
          ? emptyKeys.findIndex(field => field.fieldName === field)
          : -1;
      if (index === -1) {
        emptyKeys.push({
          fieldName: field,
          message: `${ucFirst(field)} field is required.`,
        });
      }
    });

    if (res) {
      res(!emptyKeys.length, emptyKeys);
    }
  };

  render() {
    const { reqInputs } = this.state;
    const { name, email, password } = reqInputs;
    const { actionType } = this.props;
    const actionPageTitle =
      actionType === ADD_USER ? 'Create User' : `Edit ${name}'s Profile`;

    return (
      <>
        <HeadingTitle>{actionPageTitle}</HeadingTitle>
        <div>
          <Form onSubmit={this.formSubmit}>
            <FormGroup className="form-group">
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={this.onChangeValue}
              />
              <InputError>{this.errorField('name').message}</InputError>
            </FormGroup>

            <FormGroup className="form-group">
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.onChangeValue}
                disabled={actionType === EDIT_PROFILE}
              />
              <InputError>{this.errorField('email').message}</InputError>
            </FormGroup>

            <FormGroup>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={this.onChangeValue}
              />
              <InputError>{this.errorField('password').message}</InputError>
            </FormGroup>

            {/* <FormGroup> */}
            {/*  <Input */}
            {/*    type="text" */}
            {/*    id="role" */}
            {/*    name="role" */}
            {/*    placeholder="User role" */}
            {/*    onChange={this.onChangeValue} */}
            {/*  /> */}
            {/*  <InputError>{this.errorField('role').message}</InputError> */}
            {/* </FormGroup> */}

            <div className="box-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </>
    );
  }
}

export default EditProfile;

EditProfile.propTypes = {
  actionType: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.node,
    }),
  }).isRequired,
};
