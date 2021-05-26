import { RECEIVE_API_DATA, FAIL_API_DATA, COMPLETE_API_DATA } from "../actions";

const initialState = {
  state: {
    loading: false,
    complete: false,
    error: null,
  },
  data: {},
  message: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_API_DATA:
      if (!action.payload.data) {
        const loadingState = {
          ...state,
          data: action.payload,
          state: { loading: true, complete: false, error: false },
        };
        return loadingState;
      } else {
        const loadingErrState = {
          ...state,
          data: action.payload.data,
          state: { loading: false, complete: false, error: true },
        };
        return loadingErrState;
      }
    case COMPLETE_API_DATA:
      const completeState = {
        ...state,
        state: { loading: false, complete: true, error: false },
      };
      return completeState;
    case FAIL_API_DATA:
      const errorState = {
        ...state,
        message: action.message,
        state: { loading: false, complete: false, error: true },
      };
      return errorState;
    default:
      return state;
  }
};
