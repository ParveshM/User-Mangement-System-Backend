import { createBrowserRouter } from "react-router-dom";
import { Signup, Login, Home, ProfileSection } from "../pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <ProfileSection />,
  },
  // {
  //   path: "/admin",
  //   element: <Home />,
  // },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
