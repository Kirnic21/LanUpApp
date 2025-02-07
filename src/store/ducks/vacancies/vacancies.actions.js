import { NEW_VACANCY } from "../action.types";

const notifyVacancy = vacancy => ({
  type: NEW_VACANCY,
  vacancy
});

export { notifyVacancy };
