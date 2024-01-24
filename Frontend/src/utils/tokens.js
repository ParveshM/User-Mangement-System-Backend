function getAccessToken() {
  // const token = JSON.parse(localStorage.getItem("accessToken"));
  // console.log(token);
  return localStorage.getItem("accessToken");
}
function getRefreshToken() {
  // return JSON.parse(localStorage.getItem("refreshToken"));
  return localStorage.getItem("refreshToken");
}

export { getAccessToken, getRefreshToken };
