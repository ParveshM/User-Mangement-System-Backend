import { useFormik } from "formik";
import { useState } from "react";
import { validateSignUp } from "../utils/validateSignup";
import { Toaster } from "react-hot-toast";
import showToast from "../utils/toaster";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate, Link } from "react-router-dom";
const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validate: validateSignUp,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(BASE_URL + "/signup", values)
        .then((res) => {
          const message = res.data.message;
          if (res.data.success) {
            showToast(message, "success");
            setTimeout(() => {
              console.log("signup form");

              navigate("/login");
            }, 1000);
          } else {
            showToast(message, "error");
            setIsSubmitting(false);
          }
        })
        .catch((err) => {
          setIsSubmitting(false);
          showToast("Whoops,Something went wrong", "error");
        });
    },
  });

  return (
    <section>
      <div className="bg-primaryColor flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4  sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-headerText md:text-2xl">
              Sign Up to your account
            </h1>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className=" border-b-2 border-b-inputBorderColor text-gray-900 outline-none sm:text-sm  block w-full p-2.5 "
                  placeholder="John doe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
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
                  placeholder="jhondoe@gmail.com"
                  className=" border-b-2 border-b-inputBorderColor text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border-b-2 border-b-inputBorderColor text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  name="rePassword"
                  placeholder="••••••••"
                  className=" border-b-2 border-b-inputBorderColor text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <div className="text-red-600">{formik.errors.rePassword}</div>
              ) : null}
              <button
                type="submit"
                className="w-full px-6 py-2 text-white rounded-lg bg-gradient-to-r from-cyan-700 to-cyan-500 hover:from-cyan-600 hover:to-cyan-800 "
                disabled={isSubmitting}
              >
                Register
              </button>

              <p className="text-sm  text-black text-center">
                Already have an account ?
                <Link
                  to={"/login"}
                  className="font-medium text-[#3E7A8E] hover:underline pl-1"
                >
                  Sign in
                </Link>
              </p>
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
