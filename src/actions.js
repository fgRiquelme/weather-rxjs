export const RECEIVE_API_DATA = "RECEIVE_API_DATA";
export const FAIL_API_DATA = "FAIL_API_DATA";
export const COMPLETE_API_DATA = "COMPLETE_API_DATA";
export const SEND_SEARCH = "SEND_SEARCH";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";

export const completeApiData = () => ({
  type: COMPLETE_API_DATA,
});
export const receiveApiData = (data) => ({
  type: RECEIVE_API_DATA,
  payload: data,
});
export const receiveApiError = (error) => ({
  type: FAIL_API_DATA,
  message: error,
});
export const sendSearch = (data) => ({
  type: SEND_SEARCH,
  payload: data,
});
