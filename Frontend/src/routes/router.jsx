import { createBrowserRouter } from "react-router-dom";
import { Signup, Home, ProfileSection, AdminDashboard } from "../pages/index";
import ProtectedRoute from "./ProtectedRoutes";
import IsNotLoggedIn from "./isNotLogged";
import { LoginForm } from "../components";
import EditUser from "../pages/admin/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileSection />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <IsNotLoggedIn>
        <Signup />,
      </IsNotLoggedIn>
    ),
  },
  {
    path: "/login",
    element: (
      <IsNotLoggedIn>
        <LoginForm url={"/login"} navigated={"/"} title={"Sign in"} />,
      </IsNotLoggedIn>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <LoginForm
        url={"/admin/login"}
        navigated={"/admin/dashboard"}
        title={"Admin"}
      />
    ),
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/edit_user/:id",
    element: <EditUser />,
  },
]);

export default router;
