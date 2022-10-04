import { HTTP } from "./http.base";

const codeAgency = (data) => HTTP.get(`agencies/codes?term=${data}`);
const ratingAgency = (data) => HTTP.post(`agencies/${data.id}/ratings`, data);

export { codeAgency, ratingAgency };
