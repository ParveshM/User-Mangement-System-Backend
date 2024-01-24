const handleRefreshToken = async ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export default handleRefreshToken;
