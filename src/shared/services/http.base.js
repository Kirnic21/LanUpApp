import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const HTTP = axios.create({
  baseURL: "https://lanup-api-dev.azurewebsites.net/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

const HTTPFORM = axios.create({
  baseURL: "https://lanup-api-dev.azurewebsites.net/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

HTTP.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("API_TOKEN");

    if (!config.url.endsWith("Auth") && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

HTTPFORM.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("API_TOKEN");

    if (!config.url.endsWith("Auth") && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);
export { HTTPFORM, HTTP };
