import { createStore, combineReducers } from "redux";

import token from "./loginToken/token";
import search from "./search/search";

const reducers = combineReducers({ token,search});

const store = createStore(reducers);

export default store;