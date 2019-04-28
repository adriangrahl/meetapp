/**
 * Types
 */
export const Types = {
  GET_REQUEST: 'meetupDetails/GET_REQUEST',
  GET_SUCCESS: 'meetupDetails/GET_SUCCESS',
  GET_FAILURE: 'meetupDetails/GET_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  data: null,
  loading: false,
};

export default function meetupDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, data: action.payload.data, loading: false };
    case Types.GET_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

/**
 * Creators
 */
export const Creators = {
  getMeetupDetailsRequest: id => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),

  getMeetupDetailsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getMeetupDetailsFailure: () => ({
    type: Types.GET_FAILURE,
  }),
};
