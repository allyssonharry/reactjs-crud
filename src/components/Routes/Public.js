import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import NotFound from '../Layout/NotFound';

import Login from '../Auth/Login';
import Register from '../Auth/Register';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    main: NotFound,
  },
];

class Public extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route, index) => {
          const { component: Children } = route;

          if (!route.path)
            return <Route key={index} component={route.component} />;

          return (
            <Route
              exact={route.exact}
              path={route.path}
              key={index}
              render={props => <Children {...props} {...this.props} />}
            />
          );
        })}
      </Switch>
    );
  }
}

export default Public;
