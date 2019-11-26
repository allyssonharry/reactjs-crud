import uuid from 'uuid/v4';

import {
  USER_STORAGE_DATA,
  USER_SESSION_DATA,
  USER_EXISTS,
  REQUEST_SUCCESS,
  EMPTY_DATA,
  USER_ROLE_ADMIN,
} from '../actions/types';

export class Storage {
  static setUser = (role, req, res) => {
    const getStorageData = this.getUser(USER_STORAGE_DATA)
      ? this.getUser(USER_STORAGE_DATA)
      : [];

    if (getStorageData) {
      const index = getStorageData.findIndex(
        field => field.email === req.email
      );
      if (index === -1) {
        const data = Object.assign(req, {
          id: uuid(),
          role,
        });
        getStorageData.push(data);

        localStorage.setItem(USER_STORAGE_DATA, JSON.stringify(getStorageData));

        if (role === USER_ROLE_ADMIN) {
          localStorage.setItem(USER_SESSION_DATA, JSON.stringify(data));
        }

        res(REQUEST_SUCCESS, data);
        return;
      }

      res(USER_EXISTS, {});
    }
  };

  static editUser = (req, res) => {
    const { email } = req;

    const getStorageData = this.getUser(USER_STORAGE_DATA)
      ? this.getUser(USER_STORAGE_DATA)
      : [];

    if (getStorageData) {
      const index = getStorageData.findIndex(field => field.email === email);
      if (index !== -1) {
        const { id, ...rest } = req;
        const data = Object.assign(getStorageData[index], {
          ...rest,
        });

        getStorageData[index] = data;
        localStorage.setItem(USER_STORAGE_DATA, JSON.stringify(getStorageData));

        const user = this.getUser(USER_SESSION_DATA);
        if (user.id === data.id) {
          localStorage.setItem(USER_SESSION_DATA, JSON.stringify(data));
        }

        res(REQUEST_SUCCESS, data);
        return;
      }

      res(EMPTY_DATA, {});
    }
  };

  static getUser = key => {
    return JSON.parse(localStorage.getItem(key));
  };

  static deleteUser = (id, res) => {
    const getStorageData = this.getUser(USER_STORAGE_DATA)
      ? this.getUser(USER_STORAGE_DATA)
      : [];

    if (getStorageData) {
      const index = getStorageData.findIndex(field => field.id === id);
      if (index !== -1) {
        getStorageData.splice(index, 1);
        localStorage.setItem(USER_STORAGE_DATA, JSON.stringify(getStorageData));

        res(REQUEST_SUCCESS, getStorageData);
        return;
      }

      res(EMPTY_DATA, {});
    }
  };

  static getUserById = (id, res) => {
    const getStorageData = this.getUser(USER_STORAGE_DATA)
      ? this.getUser(USER_STORAGE_DATA)
      : [];

    if (getStorageData) {
      const index = getStorageData.findIndex(field => field.id === id);
      if (index !== -1) {
        res(REQUEST_SUCCESS, getStorageData[index]);
        return;
      }

      res(EMPTY_DATA, {});
    }
  };

  static getAllUsers = (id, res) => {
    const getStorageData = this.getUser(USER_STORAGE_DATA)
      ? this.getUser(USER_STORAGE_DATA)
      : [];

    if (getStorageData.length > 0) {
      const data = Array.from(getStorageData);
      res(REQUEST_SUCCESS, data);
    } else {
      res(EMPTY_DATA, {});
    }
  };

  static login = (req, res) => {
    const { email, password } = req;

    const getStorageData = this.getUser(USER_STORAGE_DATA)
      ? this.getUser(USER_STORAGE_DATA)
      : [];

    if (getStorageData) {
      const index = getStorageData.findIndex(
        field => field.email === email && field.password === password
      );
      if (index !== -1) {
        localStorage.setItem(
          USER_SESSION_DATA,
          JSON.stringify(getStorageData[index])
        );
        res(REQUEST_SUCCESS, getStorageData[index]);
        return;
      }

      res(EMPTY_DATA, {});
    }
  };

  static removeSession = key => {
    return localStorage.removeItem(key);
  };
}
