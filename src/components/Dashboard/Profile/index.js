import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Storage } from '../../../storage/Storage';
import {
  USER_SESSION_DATA,
  USER_VIEW,
  REQUEST_SUCCESS,
  USER_ROLE_ADMIN,
} from '../../../actions/types';

import {
  ProfileContent,
  Avatar,
  ProfileName,
  Badge,
  ProfileEmail,
  EditButton,
} from './style';

class Profile extends Component {
  state = {
    userLoggedIn: Storage.getUser(USER_SESSION_DATA),
    userProfile: [],
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const {
      actionType,
      match: { params },
    } = this.props;

    if (actionType === USER_VIEW) {
      Storage.getUserById(params.userId, (status, response) => {
        if (status === REQUEST_SUCCESS) {
          this.setState({
            userProfile: response,
          });
        }
      });
    } else {
      this.setState({
        userProfile: Storage.getUser(USER_SESSION_DATA),
      });
    }
  };

  render() {
    const { role } = this.props;
    const { userProfile } = this.state;

    return (
      <ProfileContent>
        <Avatar />
        <ProfileName>
          {userProfile.name} <Badge>{userProfile.role}</Badge>
        </ProfileName>
        <ProfileEmail
          title={`Send email to: ${userProfile.email}`}
          href={`mailto:${userProfile.email}`}
        >
          {userProfile.email}
        </ProfileEmail>
        {role === USER_ROLE_ADMIN ? (
          <EditButton to={`/dashboard/users/edit/${userProfile.id}`}>
            Edit profile
          </EditButton>
        ) : null}
      </ProfileContent>
    );
  }
}

export default Profile;

Profile.propTypes = {
  role: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.node,
    }),
  }).isRequired,
};
