import { combineReducers } from "redux";

import data from "./data";
import pagination from "./pagination";
import search from "./search";

const rootReducer = combineReducers({
  data,
  pagination,
  search,
});

export default rootReducer;
