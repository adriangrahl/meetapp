export const Types = {
  SET: 'error/SET',
  HIDE: 'error/HIDE',
};

const INITIAL_STATE = {
  visible: false,
  message: null,
  data: [],
};

export default function error(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
        data: action.payload.data,
      };
    case Types.HIDE:
      return { ...state, visible: false };
    default:
      return state;
  }
}

export const Creators = {
  setError: (message, data) => ({
    type: Types.SET,
    payload: { message, data },
  }),

  hideError: () => ({ type: Types.HIDE }),
};
