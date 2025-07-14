import UserSearchBar from "../../Components/SearchBar/UserSearchBar";
import UsersList from "../../Components/ListView/UsersList";
import { useState, useEffect } from "react";
import { useSearchUsers } from "../../hooks/useSearchUsers";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { searchUsers } = useSearchUsers();

  useEffect(() => {
    (async () => {
      const results = await searchUsers({
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        id: null,
      });
      setUsers(results?.users || []);
    })();
  }, []);

  return (
    <>
      <UserSearchBar onSearch={(results) => setUsers(results.users || [])} />
      <UsersList users={users} />
    </>
  );
}
