import { LOAD_CERTIFICATE } from "../action.types";
import initialState from "../initial.state";

export default (state = initialState.certificates, action) => {
  switch (action.type) {
    case LOAD_CERTIFICATE:
      return {
        certificate:[...action.certificate ],
        loading: false 
      };
    default:
      return state;
  }
};
