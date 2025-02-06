import { HTTP } from "./http.base";
import { decode } from "base-64";

const acceptInvite = (data) => HTTP.post(`vacancies/`, data);

const vacanciesEmergencyAccept = (data) =>
  HTTP.post(`vacancies/emergency/accept`, data);

const acceptInvitations = (vacancyId) =>
  HTTP.put(`vacancies/${vacancyId}/invitations/accept`);

const deleteVacancies = (data) =>
  HTTP.put(`vacancies/${data.id}/invitations/decline`);

const deitailsVacanciesSchedules = (data) =>
  HTTP.get(
    `vacancies/${data.id}/jobs?serviceId=${data.serviceId}&day=${data.day}`
  );

const getSchedules = (data) => HTTP.get(`vacancies?status=${data}`);
const getInvites = () => HTTP.get(`vacancies/invites`);


export {
  acceptInvite,
  getSchedules,
  deleteVacancies,
  deitailsVacanciesSchedules,
  acceptInvitations,
  vacanciesEmergencyAccept,
  getInvites
};
