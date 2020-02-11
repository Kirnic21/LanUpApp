import { HTTP, HTTPFORM } from "./http.base";
import { decode } from "base-64";

const registerAgencies = data => HTTP.post(`freelas/${data.id}/agencies`, data);
const create = data => HTTP.post("freelas", data);
const galery = data => HTTPFORM.post(`freelas/${data.id}/galery`, data.url);
const saveAvailability = data =>
  HTTP.post(`freelas/${data.id}/availabilities/days`, data);
const saveSpecialDay = data =>
  HTTP.post(`freelas/${data.freelaId}/availabilities/specialdays`, data);

const updateSkills = data => HTTP.put(`freelas/${data.id}/skills`, data);
const updateJobs = data => HTTP.put(`freelas/${data.id}/jobs`, data);
const emergencyAvailability = data =>
  HTTP.put(`freelas/${data.id}/EmergencyAvailability`, data);
const aboutMe = data => HTTP.put(`freelas/${data.id}/about`, data);
const received = data => HTTP.put(`freelas/${data.freelaId}/received`, data);

const getSkills = id => HTTP.get(`freelas/${id}/skills`);
const service = () => HTTP.get(`services`);
const getJobs = id => HTTP.get(`freelas/${id}/jobs`);
const galeries = id => HTTP.get(`freelas/${id}/galery`);
const getAvailability = id => HTTP.get(`freelas/${id}/availabilities`);
const getAbout = id => HTTP.get(`freelas/${id}/about`);
const existingCpf = data => HTTP.get(`freelas/cpf/${data}/exists`);
const existingEmail = data => HTTP.get(`freelas/email/${data}/exists`);
const getWorkdays = data => HTTP.get(`freelas/workdays/${data.day}`);

const galleryDelete = (id, queryParams) =>
  HTTP.delete(`freelas/${id}/galery?${queryParams}`);

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
  saveSpecialDay,
  received,
  existingCpf,
  existingEmail,
  getWorkdays
};
