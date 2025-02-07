import { JOB_FETCHING, JOB_SUCCESS, JOB_ERROR } from "../../action.types";
import initialState from "../../initial.state";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

export default (state = initialState.jobs, action) => {
  switch (action.type) {
    case JOB_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case JOB_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case JOB_ERROR:
      return {
        ...state,
        loading: false,
        error: AlertHelper.show("error", "Erro", action.payload.error),
      };
    default:
      return state;
  }
};
