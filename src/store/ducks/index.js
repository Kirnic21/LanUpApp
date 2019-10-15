import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";

import userReducer from './user/user.reducer'

const reducers = combineReducers({
  form: formReducer,
  user: userReducer
});

export default reducers;
