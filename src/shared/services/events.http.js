import { HTTP } from "./http.base";

const vacancy = (data) => HTTP.get(`events/jobs?services=${data}`);

const emergenciesVacancies = (data) =>
  HTTP.get(
    `events/jobs/${data.id}/emergencies?service=${data.service}&day=${data.day}`
  );

const deitailsVacancies = (data) =>
  HTTP.get(`events/jobs/${data.id}?service=${data.service}&day=${data.day}`);

const location = (data) => HTTP.get(`events/location?placeId=${data}`);

const getJobMembers = ({ eventId, job }) =>
  HTTP.get(`events/${eventId}/vacancies/${job}`);

export { vacancy, deitailsVacancies, location, emergenciesVacancies, getJobMembers };
