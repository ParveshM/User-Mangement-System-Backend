import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const IsNotLoggedIn = ({ children }) => {
  const user = useSelector((store) => store.user);
  if (user.isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};
export default IsNotLoggedIn;
