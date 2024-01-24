import { useSelector, useDispatch } from "react-redux";
import { clearUser, clearTokens } from "../../redux/Slice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ searchInput, onSearch }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleLogout = (user) => {
    dispatch(clearUser());
    dispatch(clearTokens());
    navigate("/admin/login");
  };

  return (
    <nav className="bg-primaryColor p-3 flex justify-between">
      <div className="text-white font-bold hidden md:block">{user.name}🕴🏻</div>
      <div className="text-white font-bold text-xl hidden md:block">
        Admin Dashboard
      </div>
      <div className="flex md:items-center max-md:mx-auto ">
        <input
          type="search"
          placeholder="Search..."
          className="rounded-lg p-2 mr-2 text-lg focus:outline-none focus:ring-2"
          ref={searchInput}
          onKeyDown={onSearch}
        />
        <button
          className="bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-600 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
