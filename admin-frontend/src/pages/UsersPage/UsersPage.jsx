import UserSearchBar from "../../Components/SearchBar/UserSearchBar";
import UsersList from "../../Components/ListView/UsersList";
import { useState, useEffect } from "react";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { useSearchParams } from "react-router-dom";
import { useGetAdmins } from "../../hooks/useGetAdmins";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { searchUsers } = useSearchUsers();
  const { getAdmins } = useGetAdmins();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");

    if (type === "admin") {
      (async () => {
        const results = await getAdmins();
        setUsers(results?.users || []);
      })();
    } else {
      const query = {
        username: searchParams.get("username") || null,
        first_name: searchParams.get("first_name") || null,
        last_name: searchParams.get("last_name") || null,
        email: searchParams.get("email") || null,
        id: searchParams.get("id") ? parseInt(searchParams.get("id")) : null,
      };

      (async () => {
        const results = await searchUsers(query);
        setUsers(results?.users || []);
      })();
    }
  }, [searchParams]);

  const handleSearch = (results, paramsObject) => {
    setUsers(results?.admins || results?.users || []);

    const cleanParams = {};
    for (const [key, value] of Object.entries(paramsObject)) {
      if (value !== null && value !== "") {
        cleanParams[key] = value;
      }
    }
    setSearchParams(cleanParams);
  };

  return (
    <>
      <UserSearchBar onSearch={handleSearch} />
      <UsersList users={users} setUsers={setUsers} />
    </>
  );
}
