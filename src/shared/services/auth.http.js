import HTTP from "./http.base";
import AsyncStorage from "@react-native-community/async-storage";

const login = data => HTTP.post("auth", data);

const changePassword = data => HTTP.put("auth/change", data);

const loginWithFacebook = async token => {
  try {
    const { data } = await HTTP.post("auth/facebook", {
      facebookToken: token.accessToken
    });
    const tokenTask = AsyncStorage.setItem("token", data.accessToken.token);
    const userTask = AsyncStorage.setItem(
      "user",
      JSON.stringify(data.authenticateUser)
    );
    await Promise.all(tokenTask, userTask);
    return data;
  } catch (error) {
    return undefined;
  }
};

export { login, loginWithFacebook, changePassword };
