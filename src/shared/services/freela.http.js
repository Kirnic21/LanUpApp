import HTTP from "./http.base";
import { decode } from "base-64";

const create = data => HTTP.post("freelas", data);
const updateSkills = data => HTTP.put("skills", data);
const registerAgencies = data => HTTP.post(`freelas/${data.id}/agencies`, data);
const galery = data => HTTP.post(`freelas/${data.id}/galery`, data);
const emergencyAvailability = data =>
  HTTP.put(`freelas/${data.id}/EmergencyAvailability`, data);

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
  galery
};
