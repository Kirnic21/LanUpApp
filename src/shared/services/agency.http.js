import { HTTP } from "./http.base";

const codeAgency = data => HTTP.get(`agencies/codes?term=${data}`);

export { codeAgency };
