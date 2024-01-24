import { SignupForm } from "../components/index";
const Signup = () => {
  return (
    <SignupForm navigateTo={"/login"} title={" Sign Up to your account"} />
  );
};

export default Signup;
