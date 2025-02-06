import { HTTP } from "./http.base";
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = data => HTTP.post("auth", data);

const changePassword = data => HTTP.put("auth/change", data);

const resetPassword = data => HTTP.post(`auth/reset?email=${data}`);

const loginWithFacebook = async accessToken => {
  try {
    const { data } = await HTTP.post("auth/facebook", {
      facebookToken: accessToken
    });
    const tokenTask = AsyncStorage.setItem(
      "token",
      data.result.accessToken.token
    );
    const userTask = AsyncStorage.setItem(
      "user",
      JSON.stringify(data.result.authenticateUser)
    );
    await Promise.all(tokenTask, userTask);
    return data;
  } catch (error) {
    return undefined;
  }
};

export { login, loginWithFacebook, changePassword, resetPassword };
