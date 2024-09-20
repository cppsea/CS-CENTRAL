import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetBookmarks = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuthContext();

  const getBookmarks = async () => {
    setIsLoading(true);
    setError(null);
    try {

      let {token} = JSON.parse(localStorage.getItem('user'))

      if (!user && !token) {
        throw new Error("You need to be logged in first!");
      }

      const response = await fetch(
        `${apiUrl}/api/bookmarks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();
      if (!response.ok) {
        throw new Error("Failed to retrieve bookmarks");
      }
      if (response.ok) {
        setBookmarks(json)
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { getBookmarks,bookmarks, isLoading, error };
};
