import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useGetBookmarks() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const getBookmarks = async () => {
    if (!user) {
      setError("You need to be logged in");
      return;
    }

    setIsLoading(true);
    setError(null);
    const bookmarks = null;

    let response = await fetch("http://localhost:3002/api/users/bookmarks", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    bookmarks = response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
    }

    return bookmarks;
  };

  return { getBookmarks, isLoading, error };
}
