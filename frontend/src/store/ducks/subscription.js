/**
 * Types
 */
export const Types = {
  REQUEST: 'subscription/REQUEST',
  SUCCESS: 'subscription/SUCCESS',
  FAILURE: 'subscription/FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
};

export default function subscription(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { loading: true };
    case Types.SUCCESS:
      return { loading: false };
    case Types.FAILURE:
      return { loading: false };
    default:
      return state;
  }
}

/**
 * Creators
 */
export const Creators = {
  subscriptionRequest: id => ({
    type: Types.REQUEST,
    payload: { id },
  }),

  subscriptionSuccess: () => ({
    type: Types.SUCCESS,
  }),

  subscriptionFailure: () => ({
    type: Types.FAILURE,
  }),
};
