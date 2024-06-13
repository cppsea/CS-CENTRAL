import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export default function useBookmark() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const updateBookmark = async (article_id, isBookmarked, toggleBookmark) => {
    if (!user) {
      setError("You need to be logged in");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3002/api/bookmarks/${article_id}`,
        {
          method: isBookmarked ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": isBookmarked ? undefined : "application/json",
          },
          body: isBookmarked
            ? undefined
            : JSON.stringify({ articleID: article_id }),
        }
      );

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error || "Failed to toggle bookmark");
      }

      // Call the bookmark toggle function if the request is successful
      toggleBookmark();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateBookmark };
}
