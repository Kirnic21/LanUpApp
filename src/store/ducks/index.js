import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./user/user.reducer";
import galleryReducer from "./gallery/gallery.reducer";

const reducers = combineReducers({
  form: formReducer,
  user: userReducer,
  gallery: galleryReducer
});

export default reducers;
