import {
  SKILLS_FETCHING,
  SKILLS_SUCCESS,
  SKILLS_ERROR,
} from "../../action.types";
import { updateSkills, getSkills } from "~/shared/services/freela.http";

const skillsFetching = () => ({ type: SKILLS_FETCHING });

export const skillsSuccess = (skill) => ({
  type: SKILLS_SUCCESS,
  payload: {
    skill,
  },
});
const skillsError = (error) => ({
  type: SKILLS_ERROR,
  payload: {
    error,
  },
});

export const fetchSkill = ({ onSuccess }) => {
  return (dispatch) => {
    dispatch(skillsFetching());
    getSkills()
      .then(({ value }) => {
        const response = value === null ? [] : value
        dispatch(skillsSuccess(response));
        onSuccess();
      })
      .catch((error) => {
        dispatch(skillsError(error.response.data.errorMessage));
      });
  };
};

export const updateSkill = ({onSuccess, skills }) => {
  return (dispatch) => {
    dispatch(skillsFetching());
    updateSkills(skills)
      .then(() => {
        dispatch(skillsSuccess(skills));
        onSuccess();
      })
      .catch((error) => {
        dispatch(skillsError(error.response.data.errorMessage));
      });
  };
};
