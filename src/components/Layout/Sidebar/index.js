import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FiUserPlus, FiUsers, FiUser, FiCoffee } from 'react-icons/fi';

import { USER_ROLE_ADMIN } from '../../../actions/types';

import { Aside } from './style';

class Sidebar extends Component {
  render() {
    const { role } = this.props;
    return (
      <Aside>
        <nav>
          <NavLink to="/dashboard" exact activeClassName="active">
            <FiCoffee /> Welcome
          </NavLink>
          {role === USER_ROLE_ADMIN ? (
            <NavLink to="/dashboard/users/add" exact activeClassName="active">
              <FiUserPlus /> Create User
            </NavLink>
          ) : null}
          <NavLink to="/dashboard/users/list" exact activeClassName="active">
            <FiUsers /> Users
          </NavLink>
          <NavLink to="/dashboard/profile" exact activeClassName="active">
            <FiUser /> Me
          </NavLink>
        </nav>
      </Aside>
    );
  }
}

export default Sidebar;

Sidebar.propTypes = {
  role: PropTypes.string.isRequired,
};
