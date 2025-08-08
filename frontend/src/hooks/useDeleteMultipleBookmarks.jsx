import { useState } from "react";
import toast from "react-hot-toast";

export const useDeleteMultipleBookmarks = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const deleteMultipleBookmarks = async (articleIds) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/bookmarks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ article_ids: articleIds }),
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

  return { deleteMultipleBookmarks, isLoading, error };
};
