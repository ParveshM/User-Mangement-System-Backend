import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMG_BASE_URL, defaultImage } from "../../constants/index";
import showToast from "../../utils/toaster";
import { getAccessToken } from "../../utils/tokens";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axiosJWT from "../../utils/AxiosService";
const EditUserProfile = ({ id }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    profileImg: null,
  });
  const accessToken = getAccessToken();
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  const handleChange = (e) => {
    if (e.target.name === "profileImg") {
      setForm({
        ...form,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.elements.profileImg.files[0]);
    formData.append("name", form.name);

    axiosJWT
      .put(BASE_URL + "/admin/update_user/" + id, formData, config)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setForm({
            name: res.user.name,
            profileImg: res.imageUrl && IMG_BASE_URL + res.imageUrl,
          });
          showToast("Profile updated successfully", "success");
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 500);
        }
      })
      .catch((err) => {
        showToast("Something went wrong", "error");
        console.log(err);
      });
  };

  useEffect(() => {
    axiosJWT
      .get(BASE_URL + "/admin/get_user/" + id, config)
      .then((res) => {
        const response = res.data;
        if (response.success) {
          const profileImgUrl = response.user.profileImgUrl;
          setForm({
            name: response.user.name,
            profileImg: profileImgUrl && IMG_BASE_URL + profileImgUrl,
            email: response.user.email,
          });
        } else {
          navigate("/admin/dashboard");
          showToast(response.message, "error");
        }
      })
      .catch((err) => {
        console.log(err, "axios error");
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 mx-5 bg-white border border-gray-200 rounded-lg shadow-lg">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div className="flex flex-col items-center">
          <label className="block mb-2 text-xl font-bold text-gray-800">
            Profile Section
          </label>

          <form
            className="w-full flex flex-col items-center"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full bg-gray-200">
              <img
                src={form.profileImg ? form.profileImg : defaultImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
              {/*  if the user clicked change image button show make  the input visible */}
              <input
                type="file"
                name="profileImg"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
                value={form.name}
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                value={form.email}
                readOnly
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:bg-gradient-to-bl focus:outline-none"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
