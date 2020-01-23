import { HTTP } from "./http.base";
import { decode } from "base-64";

const vacancy = data => HTTP.get(`events/jobs?services=${data}`);

export { vacancy };
