import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearTokens, clearUser } from "../redux/Slice";
const Home = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(clearUser());
    dispatch(clearTokens());
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 mx-5 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="flex flex-col gap-2 items-center">
          <h5 className="text-2xl md:text-3xl font-bold">Welcome Back!</h5>
          <h3 className="text-lg font-semibold">{user?.name}</h3>
          <Link
            to="/profile"
            className="text-center mt-3 text-lg font-medium hover:underline rounded-lg focus:outline-none"
          >
            View Profile
          </Link>
          <button
            type="button"
            className="my-2 rounded-3xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
