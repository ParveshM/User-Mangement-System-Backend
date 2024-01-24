import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import showToast from "../utils/toaster";
import { validateLogin } from "../utils/validateLogin";
import { BASE_URL } from "../constants";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setTokens } from "../redux/Slice";
import { jwtDecode } from "jwt-decode";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
const LoginForm = ({ url, navigated, title }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    console.log("clie");
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(BASE_URL + url, values)
        .then((res) => {
          const message = res.data.message;
          if (res.data.success) {
            showToast(message, "success");
            const decoded = jwtDecode(res.data.accessToken);

            dispatch(
              setUser({
                name: decoded.name,
                id: decoded.id,
                isAuthenticated: true,
                isAdmin: decoded.role === "Admin",
              })
            );
            dispatch(
              setTokens({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              })
            );
            setTimeout(() => {
              navigate(navigated);
            }, 1000);
          } else {
            setIsSubmitting(false);
            showToast(message, "error");
          }
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);
          showToast("Whoops! Something went wrong", "error");
        });
    },
  });

  return (
    <section className="">
      <div className="bg-primaryColor flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4  sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-headerText md:text-2xl">
              Welcome Back! {title}
            </h1>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  placeholder="johndoe@gmail.com"
                  className=" border-b-2 border-b-inputBorderColor text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  className=" border-b-2 border-b-inputBorderColor text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer "
                  onClick={handleToggle}
                >
                  {showPassword ? <IoEye /> : <IoEyeOffSharp />}
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}

              <button
                type="submit"
                className="w-full px-6 py-2 text-white rounded-lg bg-gradient-to-r from-cyan-700 to-cyan-500 hover:from-cyan-600 hover:to-cyan-800 "
                disabled={isSubmitting}
              >
                Sign in
              </button>
              {title !== "Admin" && (
                <p className="text-sm  text-black text-center">
                  Don’t have an account yet?
                  <Link
                    to={"/signup"}
                    className="font-medium text-[#3E7A8E] hover:underline pl-1"
                  >
                    Sign up
                  </Link>
                </p>
              )}
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
