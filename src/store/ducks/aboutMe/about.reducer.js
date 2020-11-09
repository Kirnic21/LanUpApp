import { ABOUT_FETCHING, ABOUT_SUCCESS, ABOUT_ERROR } from "../action.types";
import initialState from "../initial.state";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

export default (state = initialState.about, action) => {
  switch (action.type) {
    case ABOUT_FETCHING:
      return { ...state, loading: true };
    case ABOUT_SUCCESS:
      return { about: { ...action.about }, loading: false };
    case ABOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: AlertHelper.show("error", "Erro", action.payload.error),
      };
    default:
      return state;
  }
};
