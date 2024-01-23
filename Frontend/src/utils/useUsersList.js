import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/index";
import { getAccessToken } from "../utils/tokens";
import axios from "axios";

const useUsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const accessToken = getAccessToken();
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/admin/get_all_users", config)
      .then((res) => {
        setAllUsers(res.data.users);
        setFilteredUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { allUsers, filteredUsers, setFilteredUsers };
};
export default useUsersList;
