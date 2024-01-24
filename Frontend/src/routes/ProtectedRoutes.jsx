import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (user.isAuthenticated && user.isAdmin) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  if (!user.isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
