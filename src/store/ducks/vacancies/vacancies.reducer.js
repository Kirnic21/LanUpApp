import { NEW_VACANCY } from "../action.types";
import initialState from "../initial.state";

export default (state = initialState.vacancy, action) => {
  switch (action.type) {
    case NEW_VACANCY:
      return { ...action.vacancy };
    default:
      return state;
  }
};
