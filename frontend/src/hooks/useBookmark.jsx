import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

export default function useBookmark() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const updateBookmark = async (article_id, isBookmarked, toggleBookmark) => {
    setError(null);
    setIsLoading(true);

    try {
      if (!user) {
        throw new Error("You need to be logged in first!");
      }

      const response = await fetch(
        isBookmarked
          ? `http://localhost:3002/api/bookmarks/${article_id}`
          : "http://localhost:3002/api/bookmarks",
        {
          method: isBookmarked ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": isBookmarked ? undefined : "application/json",
          },
          body: isBookmarked
            ? undefined
            : JSON.stringify({ article_id: article_id }),
        }
      );

      const json = await response.json();
      // console.log(json);
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
