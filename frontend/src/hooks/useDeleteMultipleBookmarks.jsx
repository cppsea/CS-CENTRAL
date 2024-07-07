import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleteMultipleBookmarks = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuthContext();
  //takes in list of bookmark ids to delete, method for deleting on client side
  const deleteMultipleBookmarks = async (
    bookmarkIds,
    deleteBookmarksHandler
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error("You need to be logged in first!");
      }

      const response = await fetch(
        `${apiUrl}/api/bookmarks/${bookmarkIds.join(",")}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        deleteBookmarksHandler();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMultipleBookmarks, isLoading, error };
};
