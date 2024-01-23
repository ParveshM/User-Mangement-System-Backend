import { createBrowserRouter } from "react-router-dom";
import { Signup, Login, Home, ProfileSection } from "../pages/index";
import ProtectedRoute from "./ProtectedRoutes";
import IsNotLoggedIn from "./isNotLogged";
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
        <Login />,
      </IsNotLoggedIn>
    ),
  },
]);

export default router;
