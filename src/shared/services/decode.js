import { decode } from "base-64";
import AsyncStorage from '@react-native-async-storage/async-storage';

const decodeToken = (token) =>
  JSON.parse(decode(token.split(".")[1].replace("-", "+").replace("_", "/")));

const tokenDecode = async () => {
  return decodeToken(await AsyncStorage.getItem("API_TOKEN"));
};

export { tokenDecode, decodeToken };
