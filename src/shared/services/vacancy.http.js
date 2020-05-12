import { HTTP } from "./http.base";
import { decode } from "base-64";

const acceptInvite = (data) => HTTP.post(`vacancies/`, data);

const vacanciesEmergencyAccept = (data) =>
  HTTP.post(`vacancies/emergency/accept`, data);

const acceptInvitations = (vacancyId) =>
  HTTP.put(`vacancies/${vacancyId}/invitations/accept`);

const deleteVacancies = (data) =>
  HTTP.delete(`vacancies/${data.id}/${data.checkin}/${data.checkout}`);

const deitailsVacanciesSchedules = (data) =>
  HTTP.get(
    `vacancies/${data.id}/jobs?serviceId=${data.serviceId}&day=${data.day}`
  );

const getSchedules = (data) => HTTP.get(`vacancies?status=${data}`);

export {
  acceptInvite,
  getSchedules,
  deleteVacancies,
  deitailsVacanciesSchedules,
  acceptInvitations,
  vacanciesEmergencyAccept,
};
