import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { Header, Sidebar, NotFound } from '../Layout';

import Welcome from './Welcome';
import Users from './Users';
import EditProfile from './EditProfile';
import Profile from './Profile';

import { Storage } from '../../storage/Storage';
import {
  USER_PROFILE,
  ADD_USER,
  USER_LIST,
  EDIT_PROFILE,
  USER_VIEW,
  USER_SESSION_DATA,
  USER_ROLE_ADMIN,
  USER_ROLE_USER,
} from '../../actions/types';

import { Main, Content } from './style';

const routes = [
  {
    path: '/',
    main: props => <Welcome {...props} />,
    exact: true,
  },
  {
    path: '/dashboard',
    main: props => <Welcome {...props} />,
  },
  {
    path: '/users/add',
    main: props => <EditProfile {...props} actionType={ADD_USER} />,
  },
  {
    path: '/users/list',
    main: props => <Users {...props} actionType={USER_LIST} />,
  },
  {
    path: '/users/edit/:userId',
    main: props => <EditProfile {...props} actionType={EDIT_PROFILE} />,
  },
  {
    path: '/profile',
    main: props => <Profile {...props} actionType={USER_PROFILE} />,
  },
  {
    path: '/users/view/:userId',
    main: props => <Profile {...props} actionType={USER_VIEW} />,
  },
  {
    path: '*',
    main: () => <NotFound />,
  },
];

class Dashboard extends Component {
  state = {
    userLoggedIn: Storage.getUser(USER_SESSION_DATA),
    role: '',
  };

  componentDidMount() {
    const {
      userLoggedIn: { role },
    } = this.state;

    if (role === USER_ROLE_ADMIN) {
      this.setState({ role: USER_ROLE_ADMIN });
    } else {
      this.setState({ role: USER_ROLE_USER });
    }
  }

  render() {
    const {
      match: { url },
    } = this.props;

    const { role } = this.state;

    return (
      <Main>
        <Content>
          <div>
            <Switch>
              {routes.map((route, index) => {
                const { main: Children } = route;
                return (
                  <Route
                    exact={route.exact}
                    path={`${url}${route.path}`}
                    key={index}
                    render={props => <Children role={role} {...props} />}
                  />
                );
              })}
            </Switch>
          </div>
        </Content>
        <Sidebar role={role} {...this.props} />
        <Header {...this.props} />
      </Main>
    );
  }
}

export default Dashboard;

Dashboard.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.node,
  }).isRequired,
};
