import { NEXT_PAGE, PREV_PAGE } from "../actions";
const initialState = {
  page: {
    number: 1,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      const nextPage = { ...state, page: { number: state.page.number + 1 } };
      return nextPage;
    case PREV_PAGE:
      const prevPage = { ...state, page: { number: state.page.number - 1 } };
      return prevPage;
    default:
      return state;
  }
};
