import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (!user.isAdmin) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default AdminRoute;
