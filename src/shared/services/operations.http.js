import { HTTP } from "./http.base";

const operationsCheckins = data => HTTP.post(`operations/${data.id}/checkins`);
const getCheckins = data =>
  HTTP.get(`operations/${data.id}/checkins/${data.freelaId}`);

const operationsChecklists = data =>
  HTTP.post(`operations/${data.id}/checklists`);
const getChecklists = data =>
  HTTP.get(`operations/${data.id}/checklists/${data.freelaId}`);

export { operationsCheckins, operationsChecklists, getCheckins, getChecklists };
