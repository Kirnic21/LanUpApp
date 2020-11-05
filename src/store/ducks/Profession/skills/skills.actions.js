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

export const fetchSkill = () => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(skillsFetching());
      getSkills()
        .then(({ value }) => {
          const response = value === null ? [] : value;
          dispatch(skillsSuccess(response));
          resolve();
        })
        .catch((error) => {
          dispatch(skillsError(error.response.data.errorMessage));
          reject();
        });
    });
};

export const updateSkill = ({ skills }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(skillsFetching());
      updateSkills(skills)
        .then(() => {
          dispatch(skillsSuccess(skills));
          resolve();
        })
        .catch((error) => {
          dispatch(skillsError(error.response.data.errorMessage));
          reject();
        });
    });
};
