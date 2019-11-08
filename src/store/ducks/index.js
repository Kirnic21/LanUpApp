import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./user/user.reducer";
import galleryReducer from "./gallery/gallery.reducer";

const reducers = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
  form: formReducer
});

export default reducers;
