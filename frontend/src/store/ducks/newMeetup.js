/**
 * Types
 */
export const Types = {
  REQUEST: 'newMeetup/REQUEST',
  SUCCESS: 'newMeetup/SUCCESS',
  FAILURE: 'newMeetup/FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
};

export default function newMeetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return { ...state, loading: false };
    case Types.FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

/**
 * Creators
 */
export const Creators = {
  newMeetupRequest: data => ({
    type: Types.REQUEST,
    payload: { data },
  }),

  newMeetupSuccess: () => ({
    type: Types.SUCCESS,
  }),

  newMeetupFailure: () => ({
    type: Types.FAILURE,
  }),
};
