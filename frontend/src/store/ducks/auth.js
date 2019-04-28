/**
 * Action Types
 */
export const Types = {
  SIGNIN_REQUEST: 'auth/SIGNIN_REQUEST',
  SIGNIN_SUCCESS: 'auth/SIGNIN_SUCCESS',

  SIGNUP_REQUEST: 'auth/SIGNUP_REQUEST',

  UPDATE_REQUEST: 'auth/UPDATE_REQUEST',
  UPDATE_SUCCESS: 'auth/UPDATE_SUCCESS',

  DONE: 'auth/DONE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  user:
    (!!localStorage.getItem('@MeetApp:auth')
      && JSON.parse(localStorage.getItem('@MeetApp:auth')).user)
    || null,
  token:
    (!!localStorage.getItem('@MeetApp:auth')
      && JSON.parse(localStorage.getItem('@MeetApp:auth')).token)
    || null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SIGNIN_REQUEST:
      return { ...state, loading: true };
    case Types.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case Types.UPDATE_REQUEST:
      return { ...state, loading: true };
    case Types.UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case Types.DONE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

/**
 * Action Creators
 */
export const Creators = {
  signInRequest: (email, password) => ({
    type: Types.SIGNIN_REQUEST,
    payload: { email, password },
  }),

  signInSuccess: (user, token) => ({
    type: Types.SIGNIN_SUCCESS,
    payload: { user, token },
  }),

  signUpRequest: (username, email, password) => ({
    type: Types.SIGNUP_REQUEST,
    payload: {
      username,
      email,
      password,
    },
  }),

  updateRequest: (user, redirectTo) => ({
    type: Types.UPDATE_REQUEST,
    payload: { user, redirectTo },
  }),

  updateSuccess: user => ({
    type: Types.UPDATE_SUCCESS,
    payload: { user },
  }),

  done: () => ({
    type: Types.DONE,
  }),
};
