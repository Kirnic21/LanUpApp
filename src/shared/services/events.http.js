import { HTTP } from "./http.base";
import axios from "axios";
import env from "react-native-config";
import { Platform } from 'react-native';
console.log(Platform.OS)

const apikey =
  Platform.OS === "ios"
    ? env.GOOGLE_IOS_MAPS_API_KEY
    : env.GOOGLE_ANDROID_MAPS_API_KEY;

const url_place = "https://maps.googleapis.com/maps/api/place/textsearch/json";

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

const getAddress = (place) =>
  axios.get(url_place, {
    params: { query: place, key: apikey },
  });

export {
  vacancy,
  deitailsVacancies,
  location,
  emergenciesVacancies,
  getJobMembers,
  getAddress
};
