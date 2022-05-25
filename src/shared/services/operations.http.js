import { HTTP } from "./http.base";
const resource = `operations`;
const operationsCheckins = (data) =>
  HTTP.post(`${resource}/${data.id}/checkins`, data);

const operationsChecklists = (data) =>
  HTTP.post(`${resource}/${data.id}/checklists`, data);

const breaks = (data) => HTTP.post(`${resource}/${data.id}/breaks`, data);
const updatebreaks = (data) => HTTP.put(`${resource}/${data.id}/breaks`, data);
const openedBreaks = (data) => HTTP.get(`${resource}/${data.id}/breaks/opened`);

const incidents = (data) => HTTP.post(`${resource}/${data.id}/incidents`, data);

const operationsCheckout = (data) =>
  HTTP.post(`${resource}/${data.id}/checkouts`, data);

const operationsStatus = (data) =>
  HTTP.get(
    `${resource}/${data.id}/freelas/${data.freelaId}/status/${data.isHomeOffice}`
  );

const startOperation = (data) =>
  HTTP.post(`${resource}/${data.id}/start`, data);
const arrivelOperation = (data) =>
  HTTP.post(`${resource}/${data.id}/arrival`, data);
const checkpoints = (data) =>
  HTTP.post(`${resource}/${data.id}/checkpoints`, data);

const location = (data) =>
  HTTP.post(`${resource}/${data.id}/currentLocation`, data);

const checkListStatus = ({ id, origin, freelaId }) =>
  HTTP.get(`${resource}/${id}/checklists/${origin}/freelas/${freelaId}`);

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
  location,
  checkListStatus
};
