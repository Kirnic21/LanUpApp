import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./user/user.reducer";
import galleryReducer from "./gallery/gallery.reducer";
import vacancyReducer from "./vacancies/vacancies.reducer";
import Aboutreducer from "./aboutMe/about.reducer";

const reducers = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
  form: formReducer,
  vacancy: vacancyReducer,
  aboutMe: Aboutreducer,
});

export default reducers;
