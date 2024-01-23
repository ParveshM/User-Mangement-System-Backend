import { useSelector } from "react-redux";
const Navbar = ({ searchInput, onSearch }) => {
  const user = useSelector((store) => store.user);
  return (
    <nav className="bg-primaryColor p-3 flex justify-between">
      <div className="text-white font-bold hidden md:block">{user.name}🕴🏻</div>
      <div className="text-white font-bold text-xl hidden md:block">
        Admin Dashboard
      </div>
      <div className="flex items-center">
        <input
          type="search"
          placeholder="Search..."
          className="rounded-lg p-2 mr-2 text-lg focus:outline-none focus:ring-2"
          ref={searchInput}
          onKeyDown={onSearch}
        />
        <button className="bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
