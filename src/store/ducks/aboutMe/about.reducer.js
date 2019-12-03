import { LOAD_ABOUT } from "../action.types";
import initialState from "../initial.state";

export default (state = initialState.about, action) => {
  switch (action.type) {
    case LOAD_ABOUT:
      return { ...action.about };
    default:
      return state;
  }
};
