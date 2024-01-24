import { createBrowserRouter } from "react-router-dom";
import {
  Signup,
  Home,
  ProfileSection,
  AdminDashboard,
  EditUser,
  AddUser,
} from "../pages/index";
import ProtectedRoute from "./ProtectedRoutes";
import IsNotLoggedIn from "./isNotLogged";
import { LoginForm } from "../components";

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
  {
    path: "/admin/add_new_user",
    element: <AddUser />,
  },
]);

export default router;
