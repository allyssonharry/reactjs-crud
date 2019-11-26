import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../Dashboard';

const routes = [
  {
    path: '/dashboard',
    component: props => <Dashboard {...props} />,
  },
];

class Private extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route, index) => {
          const { component: Children } = route;
          return (
            <Route
              path={route.path}
              key={index}
              render={props => <Children {...props} {...this.props} />}
              exact={route.exact}
            />
          );
        })}
      </Switch>
    );
  }
}

export default Private;
