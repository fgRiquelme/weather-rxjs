import { SEND_SEARCH } from "../actions";
const initialState = {
  city: {
    cityName: "",
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_SEARCH:
      const searchState = {
        ...state,
        city: { cityName: action.payload.city },
      };
      return searchState;
    default:
      return state;
  }
};
