import { createActions } from 'redux-actions';

export const { auth } = createActions({
  AUTH: {
    LOGIN: (data) => ({ data }),
    LOGIN_RESPONSE: (token) => ({ token }),
    SIGNUP: () => ({ }),
    SIGNUP_RESPONSE: () => ({ }),
    LOGOUT: () => ({ }),
  }
})