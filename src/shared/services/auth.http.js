import HTTP from './http.base';

const login = data => HTTP.post('auth', data);

export default login;
