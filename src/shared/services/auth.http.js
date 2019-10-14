import HTTP from './http.base';

const login = data => HTTP.post('auth', data);


const loginWithFacebook = async  token => {
  try {
    const result = await HTTP.post('auth/facebook', { facebookToken: token.accessToken });
    const tokenTask = AsyncStorage.setItem("token", result.token);
    const userTask = AsyncStorage.setItem("user", JSON.stringify(result.user));
    await Promise.all(tokenTask, userTask);
    return result;
  } catch (error) {
    throw error
  }
}


export {
  login,
  loginWithFacebook
}
