import HTTP from './http.base';

const create = data => HTTP.post('freelas', data);
const updateSkills = data => HTTP.put('skills', data);

export { create, updateSkills };
