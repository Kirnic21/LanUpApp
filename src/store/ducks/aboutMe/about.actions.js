import { ABOUT_FETCHING, ABOUT_SUCCESS, ABOUT_ERROR } from "../action.types";
import { getAboutHttp, aboutMe } from "~/shared/services/freela.http";

const aboutFetching = () => ({ type: ABOUT_FETCHING });
const aboutSuccess = (about) => ({
  type: ABOUT_SUCCESS,
  about,
});
const aboutError = (error) => ({
  type: ABOUT_ERROR,
  payload: {
    error,
  },
});

export const getAbout = () => {
  return (dispatch) => {
    dispatch(aboutFetching());
    getAboutHttp()
      .then(({ value }) => {
        dispatch(aboutSuccess(value));
      })
      .catch((error) => {
        dispatch(aboutError(error.response.data.errorMessage));
      });
  };
};

export const updateAbout = ({ request, value }) => {

  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(aboutFetching());
      aboutMe(request)
        .then(() => {

          dispatch(aboutSuccess(value));
          resolve();
        })
        .catch((error) => {
        console.log("API Error:", error);
          dispatch(aboutError(error.response.data.errorMessage));
          reject();
        });
    });
};
