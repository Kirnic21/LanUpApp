import { SKILLS_FETCHING, SKILLS_SUCCESS, SKILLS_ERROR } from "../../action.types";
import initialState from "../../initial.state";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

export default (state = initialState.skills, action) => {

  switch (action.type) {
    case SKILLS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case SKILLS_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case SKILLS_ERROR:
      return {
        ...state,
        loading: false,
        error: AlertHelper.show("error", "Erro", action.payload.error),
      };
    default:
      return state;
  }
};
