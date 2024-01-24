const filterUsers = (searchText, users) => {
  return users.filter((user) => {
    return user.email.toLowerCase().includes(searchText.toLowerCase());
  });
};
export default filterUsers;
