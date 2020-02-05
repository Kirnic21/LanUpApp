import { HTTP } from "./http.base";
import { decode } from "base-64";

const acceptInvite = data => HTTP.post(`vacancies/`, data);

const deleteVacancies = data =>
  HTTP.delete(`vacancies/${data.id}/${data.checkin}/${data.checkout}`);

const getSchedules = data => HTTP.get(`vacancies?status=${data}`);

export { acceptInvite, getSchedules, deleteVacancies };
