import { useRef } from "react";
import { Navbar, UserList } from "../../components/index";
import useUsersList from "../../utils/useUsersList";
import filterUsers from "../../utils/filterUsers";

const AdminDashboard = () => {
  const searchInput = useRef();
  //   get users from custom hook
  const { allUsers, filteredUsers, setFilteredUsers } = useUsersList();

  const onSearch = (e) => {
    if (e.keyCode === 13) {
      const searchText = searchInput.current.value;
      const data = filterUsers(searchText, allUsers);
      setFilteredUsers(data);
    }
  };

  return (
    <>
      <Navbar searchInput={searchInput} onSearch={onSearch} />
      <div className="container mx-auto p-2">
        <div className="flex justify-end mb-4">
          <button className="bg-blue-800 text-white rounded-full py-2 px-4 hover:bg-blue-900 transition duration-300">
            Add New User
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!filteredUsers.length ? (
            <h1>No users found</h1>
          ) : (
            filteredUsers.map((user) => {
              return <UserList {...user} key={user._id} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
