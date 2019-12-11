import { HTTP, HTTPFORM } from "./http.base";
import { decode } from "base-64";

const create = data => HTTP.post("freelas", data);
const updateSkills = data => HTTP.put(`freelas/${data.id}/skills`, data);
const getSkills = id => HTTP.get(`freelas/${id}/skills`);
const registerAgencies = data => HTTP.post(`freelas/${data.id}/agencies`, data);

const service = () => HTTP.get(`services`);

const updateJobs = data => HTTP.put(`freelas/${data.id}/jobs`, data);
const getJobs = id => HTTP.get(`freelas/${id}/jobs`);

const galery = data => HTTPFORM.post(`freelas/${data.id}/galery`, data.url);
const galeries = id => HTTP.get(`freelas/${id}/galery`);
const galleryDelete = (id, queryParams) =>
  HTTP.delete(`freelas/${id}/galery?${queryParams}`);

const emergencyAvailability = data =>
  HTTP.put(`freelas/${data.id}/EmergencyAvailability`, data);
const saveAvailability = data =>
  HTTP.post(`freelas/${data.id}/availabilities/days`, data);
const getAvailability = id => HTTP.get(`freelas/${id}/availabilities`);

const aboutMe = data => HTTP.put(`freelas/${data.id}/about`, data);

const getAbout = id => HTTP.get(`freelas/${id}/about`);

const saveSpecialDay = data =>
  HTTP.post(`freelas/${data.freelaId}/availabilities/specialdays`, data);

const decodeToken = token =>
  JSON.parse(
    decode(
      token
        .split(".")[1]
        .replace("-", "+")
        .replace("_", "/")
    )
  );

export {
  create,
  updateSkills,
  registerAgencies,
  decodeToken,
  emergencyAvailability,
  galery,
  galeries,
  galleryDelete,
  saveAvailability,
  getAvailability,
  getAbout,
  aboutMe,
  getSkills,
  service,
  updateJobs,
  getJobs,
  saveSpecialDay
};
