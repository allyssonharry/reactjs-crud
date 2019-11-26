import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { FiMail, FiUser, FiEdit3, FiTrash, FiEye } from 'react-icons/fi';

import { Storage } from '../../../storage/Storage';
import {
  USER_SESSION_DATA,
  REQUEST_SUCCESS,
  USER_ROLE_ADMIN,
} from '../../../actions/types';

import { TableResponsive, Table, ButtonGroup, Search } from './style';

class Users extends Component {
  state = {
    userLoggedIn: Storage.getUser(USER_SESSION_DATA),
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    const { userLoggedIn } = this.state;

    if (userLoggedIn.id) {
      Storage.getAllUsers(userLoggedIn.id, (status, response) => {
        if (status === REQUEST_SUCCESS) {
          this.setState({
            users: response,
          });
        }
      });
    }
  };

  redirectTo = path => {
    const { history } = this.props;

    history.push(path);
  };

  deleteUser = id => {
    const { userLoggedIn } = this.state;

    if (id === userLoggedIn.id) {
      Swal.fire({
        title: 'Hey, hey...',
        text: 'You are logged in!',
        heightAuto: false,
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: null,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        Storage.deleteUser(id, res => {
          if (res === REQUEST_SUCCESS) {
            Swal.fire('Success!', 'User deleted successfully!', 'success');
            this.getUsers();
            return;
          }
          Swal.fire('Error...', 'Please try again!', 'error');
        });
      }
    });
  };

  searchInputChange = e => {
    const { value } = e.target;
    this.searchInputResults(value.toLowerCase());
  };

  searchInputResults = value => {
    const { users } = this.state;

    if (value.length) {
      this.setState({
        users: users.filter(q => q.name.toLowerCase().includes(value)),
      });
    } else {
      this.getUsers();
    }
  };

  render() {
    const { users } = this.state;
    const { role } = this.props;
    return (
      <>
        <Search>
          <input
            type="search"
            onChange={this.searchInputChange}
            placeholder="Search user..."
          />
        </Search>

        <TableResponsive>
          <Table>
            <thead>
              <tr>
                <th>
                  <FiUser />
                </th>
                <th>
                  <FiMail />
                </th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {users && users.length ? (
                users.map(({ id, name, email }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>
                      <a
                        href={`mailto:${email}`}
                        title={`Send email to: ${email}`}
                      >
                        {email}
                      </a>
                    </td>
                    <td />
                    <td>
                      <ButtonGroup>
                        <button
                          type="button"
                          title="User Profile"
                          onClick={this.redirectTo.bind(
                            this,
                            `/dashboard/users/view/${id}`
                          )}
                        >
                          <FiEye />
                        </button>
                        {role === USER_ROLE_ADMIN ? (
                          <>
                            <button
                              type="button"
                              title="Edit User"
                              onClick={this.redirectTo.bind(
                                this,
                                `/dashboard/users/edit/${id}`
                              )}
                            >
                              <FiEdit3 />
                            </button>
                            <button
                              type="button"
                              title="Delete User"
                              onClick={this.deleteUser.bind(this, id)}
                            >
                              <FiTrash />
                            </button>
                          </>
                        ) : null}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No data available.</td>
                  <td>No data available.</td>
                  <td />
                  <td />
                </tr>
              )}
            </tbody>
          </Table>
        </TableResponsive>
      </>
    );
  }
}

export default Users;

Users.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  role: PropTypes.string.isRequired,
};
