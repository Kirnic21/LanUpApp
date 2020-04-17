import { HTTP } from "./http.base";
import { decode } from "base-64";

const vacancy = (data) => HTTP.get(`events/jobs?services=${data}`);
const deitailsVacancies = (data) =>
  HTTP.get(`events/jobs/${data.id}?service=${data.service}&day=${data.day}`);

const location = (data) => HTTP.get(`events/location?placeId=${data}`);

export { vacancy, deitailsVacancies, location };
