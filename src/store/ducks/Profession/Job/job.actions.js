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

export const fetchJobs = () => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(jobFetching());
      getJobs()
        .then((value) => {
          dispatch(jobSuccess(value));
          resolve();
        })
        .catch((error) => {
          dispatch(jobError(error.response.data.errorMessage));
          reject();
        });
    });
};

export const updateServices = ({ services, jobs }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(jobFetching());
      updateJobs(jobs)
        .then(() => {
          dispatch(jobSuccess(services));
          resolve();
        })
        .catch((error) => {
          dispatch(jobError(error.response.data.errorMessage));
          reject();
        });
    });
};
