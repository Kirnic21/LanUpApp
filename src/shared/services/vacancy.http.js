import { HTTP } from "./http.base";
import { decode } from "base-64";

const acceptInvite = data => HTTP.post(`vacancies/`, data);

export { acceptInvite };
