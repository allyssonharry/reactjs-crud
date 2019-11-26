import React, { Component } from 'react';
import history from '../services/history';
import Emitter from '../config/events';

import { Loading } from './Layout';

import Private from './Routes/Private';
import Public from './Routes/Public';

import { Storage } from '../storage/Storage';
import { USER_SESSION_DATA, USER_AUTH_CHANGE } from '../actions/types';

class Root extends Component {
  state = {
    isLoading: true,
    isLoggedIn: !!Storage.getUser(USER_SESSION_DATA),
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 500);

    Emitter.on(USER_AUTH_CHANGE, ({ isLoggedIn }) => {
      this.setState({ isLoggedIn });
    });

    this.redirectTo();
  }

  componentWillUnmount() {
    Emitter.removeListener(USER_AUTH_CHANGE, () => {});
  }

  redirectTo = () => {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      history.push('/dashboard');
    }
  };

  render() {
    const { isLoading, isLoggedIn } = this.state;

    if (isLoading) return <Loading />;

    if (isLoggedIn) return <Private eventEmitter={Emitter} />;

    return <Public eventEmitter={Emitter} />;
  }
}

export default Root;
