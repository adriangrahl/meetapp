/**
 * Types
 */
export const Types = {
  UNSUBSCRIBED_REQUEST: 'meetups/UNSUBSCRIBED_REQUEST',
  UNSUBSCRIBED_SUCCESS: 'meetups/UNSUBSCRIBED_SUCCESS',
  UNSUBSCRIBED_FAILURE: 'meetups/UNSUBSCRIBED_FAILURE',

  SUBSCRIBED_REQUEST: 'meetups/SUBSCRIBED_REQUEST',
  SUBSCRIBED_SUCCESS: 'meetups/SUBSCRIBED_SUCCESS',
  SUBSCRIBED_FAILURE: 'meetups/SUBSCRIBED_FAILURE',

  RECOMMENDED_REQUEST: 'meetups/RECOMMENDED_REQUEST',
  RECOMMENDED_SUCCESS: 'meetups/RECOMMENDED_SUCCESS',
  RECOMMENDED_FAILURE: 'meetups/RECOMMENDED_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  subscribed: {
    data: [],
    loading: false,
  },
  unsubscribed: {
    data: [],
    loading: false,
  },
  recommended: {
    data: [],
    loading: false,
  },
};

export default function meetups(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SUBSCRIBED_REQUEST:
      return {
        ...state,
        subscribed: {
          ...state.subscribed,
          loading: true,
        },
      };
    case Types.SUBSCRIBED_SUCCESS:
      return {
        ...state,
        subscribed: {
          data: action.payload.data,
          loading: false,
        },
      };
    case Types.SUBSCRIBED_FAILURE:
      return {
        ...state,
        subscribed: {
          ...state.subscribed,
          loading: false,
        },
      };

    case Types.UNSUBSCRIBED_REQUEST:
      return {
        ...state,
        unsubscribed: {
          ...state.unsubscribed,
          loading: true,
        },
      };
    case Types.UNSUBSCRIBED_SUCCESS:
      return {
        ...state,
        unsubscribed: {
          data: action.payload.data,
          loading: false,
        },
      };
    case Types.UNSUBSCRIBED_FAILURE:
      return {
        ...state,
        unsubscribed: {
          ...state.unsubscribed,
          loading: false,
        },
      };

    case Types.RECOMMENDED_REQUEST:
      return {
        ...state,
        recommended: {
          ...state.recommended,
          loading: true,
        },
      };
    case Types.RECOMMENDED_SUCCESS:
      return {
        ...state,
        recommended: {
          data: action.payload.data,
          loading: false,
        },
      };
    case Types.RECOMMENDED_FAILURE:
      return {
        ...state,
        recommended: {
          ...state.recommended,
          loading: true,
        },
      };

    default:
      return state;
  }
}

/**
 * Creators
 */
export const Creators = {
  getSubscribedRequest: title => ({
    type: Types.SUBSCRIBED_REQUEST,
    payload: { title },
  }),
  getSubscribedSuccess: data => ({
    type: Types.SUBSCRIBED_SUCCESS,
    payload: { data },
  }),
  getSubscribedFailure: () => ({
    type: Types.SUBSCRIBED_FAILURE,
  }),

  getUnsubscribedRequest: title => ({
    type: Types.UNSUBSCRIBED_REQUEST,
    payload: { title },
  }),
  getUnsubscribedSuccess: data => ({
    type: Types.UNSUBSCRIBED_SUCCESS,
    payload: { data },
  }),
  getUnsubscribedFailure: () => ({
    type: Types.UNSUBSCRIBED_FAILURE,
  }),

  getRecommendedRequest: title => ({
    type: Types.RECOMMENDED_REQUEST,
    payload: { title },
  }),
  getRecommendedSuccess: data => ({
    type: Types.RECOMMENDED_SUCCESS,
    payload: { data },
  }),
  getRecommendedFailure: () => ({
    type: Types.RECOMMENDED_FAILURE,
  }),
};
