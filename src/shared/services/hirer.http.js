import { HTTP } from "./http.base";

const ratingHirer = (data) => HTTP.post(`hirers/${data.id}/ratings`, data);

export { ratingHirer };
