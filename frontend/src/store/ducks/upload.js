/**
 * Types
 */
export const Types = {
  REQUEST: 'upload/REQUEST',
  SUCCESS: 'upload/SUCCESS',
  FAILURE: 'upload/FAILURE',

  DELETE: 'upload/DELETE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  data: null,
  loading: false,
};

export default function upload(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
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
  uploadRequest: file => ({
    type: Types.REQUEST,
    payload: { file },
  }),

  uploadSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  uploadFailure: () => ({
    type: Types.FAILURE,
  }),

  uploadDelete: id => ({
    type: Types.DELETE,
    payload: { id },
  }),
};
