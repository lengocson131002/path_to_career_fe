import { combineReducers } from "@reduxjs/toolkit";

import globalReducer from "./global.store";
import userReducer from "./user.store";

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
});

export default rootReducer;
