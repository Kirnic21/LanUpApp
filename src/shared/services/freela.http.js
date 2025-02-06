import { HTTP, HTTPFORM } from "./http.base";
import { tokenDecode } from "~/shared/services/decode";

const getAbout = () =>
  tokenDecode().then(({ id }) =>
    HTTP.get(`freelas/${id}/about`).then(({ data }) => data.result)
  );

const aboutMe = (data) =>
  tokenDecode().then(({ id: freelaId }) =>
    HTTP.put(`freelas/${freelaId}/about`, { freelaId, ...data }).then(
      ({ data }) => data.result
    )
  );

const received = (data) =>
  tokenDecode().then(({ id }) =>
    HTTP.put(`freelas/${id}/received`, { freelaId: id, ...data }).then(
      ({ data }) => data.result
    )
  );

const getJobs = () =>
  tokenDecode().then(({ id }) =>
    HTTP.get(`freelas/${id}/jobs`).then(({ data }) => data)
  );

const updateJobs = (jobs) =>
  tokenDecode().then(({ id }) =>
    HTTP.put(`freelas/${id}/jobs`, { id, jobs }).then((data) => data)
  );

const getSkills = () =>
  tokenDecode().then(({ id }) =>
    HTTP.get(`freelas/${id}/skills`).then(({ data }) => data.result)
  );

const updateSkills = (skills) =>
  tokenDecode().then(({ id }) =>
    HTTP.put(`freelas/${id}/skills`, { id, skills }).then((data) => data)
  );

const registerAgencies = (data) =>
  HTTP.post(`freelas/${data.id}/agencies`, data);
const create = (data) => HTTP.post("freelas", data);
const galery = (data) => HTTPFORM.post(`freelas/${data.id}/galery`, data.url);
const saveAvailability = (data) =>
  HTTP.post(`freelas/${data.id}/availabilities/days`, data);
const saveSpecialDay = (data) =>
  HTTP.post(`freelas/${data.freelaId}/availabilities/specialdays`, data);

const emergencyAvailability = (data) =>
  HTTP.put(`freelas/${data.id}/EmergencyAvailability`, data);

const service = () => HTTP.get(`services`);

const galeries = (id) => HTTP.get(`freelas/${id}/galery`);
const getAvailability = (id) => HTTP.get(`freelas/${id}/availabilities`);

const existingCpf = (data) => HTTP.get(`freelas/cpf/${data}/exists`);
const existingEmail = (data) => HTTP.get(`freelas/email/${data}/exists`);
const workdays = () => HTTP.get(`freelas/workdays/`);

const updateAgencies = (data) => HTTP.put(`freelas/${data.id}/agencies`, data);
const getAgencies = (id) => HTTP.get(`freelas/${id}/agencies`);

const galleryDelete = (id, queryParams) =>
  HTTP.delete(`freelas/${id}/galery?${queryParams}`);

const getBank = (term) =>
  HTTP.get("banks", {
    params: { term },
  });

const checkPendingPayment = () =>
  tokenDecode().then(({ id }) =>
    HTTP.get(`freelas/${id}/pending/payment`).then(({ data }) => data.result)
  );

const deleteAccount = (data) =>
  tokenDecode().then(({ id }) =>
    HTTP.put(`freelas/${id}/anonymizeAccount`, data).then(
      ({ data }) => data.result
    )
  );

const validateBankInformation = (data) =>
  tokenDecode().then(({ id }) =>
    HTTP.get(`freelas/${id}/validateBankInformation`).then(
      ({ data }) => data.result
    )
  );

export {
  create,
  updateSkills,
  registerAgencies,
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
  workdays,
  updateAgencies,
  getAgencies,
  getBank,
  checkPendingPayment,
  deleteAccount,
  validateBankInformation,
};
