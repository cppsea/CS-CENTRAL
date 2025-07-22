import { useState } from "react";
import toast from "react-hot-toast";

export const useGetBookmarks = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const getBookmarks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/bookmarks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
      }
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't delete bookmarks.");
      toast.error("Something went wrong. Couldn't delete bookmarks.");
    } finally {
      setIsLoading(false);
    }
  };

  return { getBookmarks, isLoading, error };
};
