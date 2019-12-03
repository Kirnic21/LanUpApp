import { LOAD_ABOUT } from "../action.types";

const setAbout = about => ({
  type: LOAD_ABOUT,
  about
});

export { setAbout };
