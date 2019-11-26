import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiBox } from 'react-icons/fi';
import history from '../../../services/history';

import { Storage } from '../../../storage/Storage';
import { USER_SESSION_DATA, USER_AUTH_CHANGE } from '../../../actions/types';

import { TopBar } from './style';

class Header extends Component {
  state = {
    userLoggedIn: Storage.getUser(USER_SESSION_DATA),
  };

  logout = () => {
    const { eventEmitter } = this.props;

    eventEmitter.emit(USER_AUTH_CHANGE, {
      isLoggedIn: false,
    });
    Storage.removeSession(USER_SESSION_DATA);

    history.push('/');
  };

  render() {
    const { userLoggedIn } = this.state;
    return (
      <TopBar>
        <div>
          <span>
            <FiBox size={26} />
          </span>
          <ul>
            <li>
              Hello,{' '}
              {userLoggedIn ? userLoggedIn.name.split(' ', 1) : 'John Doe'}
            </li>
            <li>
              <button type="button" onClick={this.logout.bind(this)}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </TopBar>
    );
  }
}

export default Header;

Header.propTypes = {
  eventEmitter: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
