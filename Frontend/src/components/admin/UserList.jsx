import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BASE_URL, IMG_BASE_URL, defaultImage } from "../../constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import showToast from "../../utils/toaster";
import Modal from "./Modal";
import axios from "axios";
import { getAccessToken } from "../../utils/tokens";
import axiosJWT from "../../utils/AxiosService";
const UserList = ({ name, email, profileImgUrl, _id, removeUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const accessToken = getAccessToken();
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
  const handleOk = () => {
    axiosJWT
      .delete(BASE_URL + "/admin/delete_user" + `/${_id}`, config)
      .then((res) => {
        showToast(res.data, "success");
        removeUser(_id);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(false);
  };
  return (
    <div className="bg-white rounded p-3 shadow-md relative">
      <div className="flex items-center mb-2">
        <div className="relative w-20 h-20 mb-4 mr-2 overflow-hidden rounded-full ">
          <img
            src={profileImgUrl ? IMG_BASE_URL + profileImgUrl : defaultImage}
            alt="User Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="absolute top-0 right-0 mt-2 mr-2">
        '
        <Link to={"/admin/edit_user/" + `${_id}`}>
          <button className="text-blue-500 mr-2">
            <FaEdit size={20} />
          </button>
        </Link>
        <button className="text-red-500" onClick={() => setIsOpen(true)}>
          <MdDelete size={20} />
        </button>
      </div>
      {isOpen && <Modal handleCancel={handleCancel} handleOk={handleOk} />}
    </div>
  );
};

export default UserList;
