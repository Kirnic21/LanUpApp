import { HTTP } from "./http.base";
const resource = `operations`;
const operationsCheckins = data =>
  HTTP.post(`${resource}/${data.id}/checkins`, data);
const getCheckins = data =>
  HTTP.get(`${resource}/${data.id}/checkins/${data.freelaId}`);

const operationsChecklists = data =>
  HTTP.post(`${resource}/${data.id}/checklists`, data);
const getChecklists = data =>
  HTTP.get(
    `${resource}/${data.id}/checklists/${data.origin}/freelas/${data.freelaId}`,
    data
  );

const incidents = data => HTTP.post(`${resource}/${data.id}/incidents`, data);

export {
  operationsCheckins,
  operationsChecklists,
  getCheckins,
  getChecklists,
  incidents
};
