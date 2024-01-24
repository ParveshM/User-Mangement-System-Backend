import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, getRefreshToken } from "./tokens";
import { BASE_URL } from "../constants";
import handleRefreshToken from "./storeToken";
const axiosJWT = axios.create();

const getNewRefreshToken = async () => {
  try {
    const res = await axios.post(BASE_URL + "/refresh_token", {
      refreshToken: getRefreshToken(),
    });
    return res.data;
  } catch (error) {
    console.log("Error in refreshing token" + error);
  }
};

axiosJWT.interceptors.request.use(async (config) => {
  let currentDate = new Date();
  try {
    var decodedToken = jwtDecode(`${getAccessToken()}`);
  } catch (error) {
    console.log("error in decodeToken" + error);
  }
  if (decodedToken.exp * 1000 < currentDate) {
    console.log(" calling the refresh token");
    const data = await getNewRefreshToken();
    await handleRefreshToken(data);

    config.headers["Authorization"] = "Bearer " + data.accessToken;
  }
  return config;
});

export default axiosJWT;
