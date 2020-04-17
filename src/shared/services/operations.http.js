import { HTTP } from "./http.base";
const resource = `operations`;
const operationsCheckins = (data) =>
  HTTP.post(`${resource}/${data.id}/checkins`, data);

const operationsChecklists = (data) =>
  HTTP.post(`${resource}/${data.id}/checklists`, data);

const breaks = (data) => HTTP.post(`${resource}/${data.id}/breaks`, data);
const updatebreaks = (data) => HTTP.put(`${resource}/${data.id}/breaks`);
const openedBreaks = (data) => HTTP.get(`${resource}/${data.id}/breaks/opened`);

const incidents = (data) => HTTP.post(`${resource}/${data.id}/incidents`, data);

const operationsCheckout = (data) =>
  HTTP.post(`${resource}/${data.id}/checkouts`, data);

const operationsStatus = (data) =>
  HTTP.get(`${resource}/${data.id}/freelas/${data.freelaId}/status`);

const startOperation = (id) => HTTP.post(`${resource}/${id}/start`);
const arrivelOperation = (id) => HTTP.post(`${resource}/${id}/arrival`);
const checkpoints = (data) =>
  HTTP.post(`${resource}/${data.id}/checkpoints`, data);

export {
  operationsCheckins,
  operationsChecklists,
  operationsCheckout,
  incidents,
  breaks,
  updatebreaks,
  openedBreaks,
  operationsStatus,
  startOperation,
  arrivelOperation,
  checkpoints,
};
