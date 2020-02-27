import { HTTP } from "./http.base";

const ratings = data => HTTP.post(`hirers/${data.id}/ratings`, data);

export { ratings };
