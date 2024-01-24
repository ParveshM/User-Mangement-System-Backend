import { SignupForm } from "../../components/index";
const AddUser = () => {
  return <SignupForm navigateTo={"/admin/dashboard"} title={"Create user"} />;
};

export default AddUser;
