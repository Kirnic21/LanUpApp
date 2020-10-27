import { JOB_FETCHING, JOB_SUCCESS, JOB_ERROR } from "../../action.types";
import { updateJobs, getJobs } from "~/shared/services/freela.http";

const jobFetching = () => ({ type: JOB_FETCHING });
export const jobSuccess = (services) => ({
  type: JOB_SUCCESS,
  payload: {
    services,
  },
});
const jobError = (error) => ({
  type: JOB_ERROR,
  payload: {
    error,
  },
});

export const fetchJobs = ({ onSuccess }) => {
  return (dispatch) => {
    dispatch(jobFetching());
    getJobs()
      .then((value) => {
        dispatch(jobSuccess(value));
        onSuccess();
      })
      .catch((error) => {
        dispatch(jobError(error.response.data.errorMessage));
      });
  };
};

export const updateServices = ({ services, onSuccess, jobs }) => {
  return (dispatch) => {
    dispatch(jobFetching());
    updateJobs(jobs)
      .then(() => {
        dispatch(jobSuccess(services));
        onSuccess();
      })
      .catch((error) => {
        dispatch(jobError(error.response.data.errorMessage));
      });
  };
};
