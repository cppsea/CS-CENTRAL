import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useDeleteBookmark() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const deleteBookmark = async (article_id) => {
    if (!user) {
      setError("You need to be logged in");
      return;
    }

    setIsLoading(true);
    setError(null);

    let response = await fetch(
      `http://localhost:3002/api/users/bookmarks/${article_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { deleteBookmark, isLoading, error };
}
