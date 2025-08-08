import { useState } from "react";
import toast from "react-hot-toast";

export const useToggleBookmark = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleBookmark = async (articleId, isBookmarked) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;

      if (!isBookmarked) {
        response = await fetch(`${apiUrl}/api/bookmarks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ article_id: articleId }),
        });
      } else {
        response = await fetch(`${apiUrl}/api/bookmarks/${articleId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
      }

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
      }
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't toggle bookmark.");
      toast.error("Something went wrong. Couldn't toggle bookmark.");
    } finally {
      setIsLoading(false);
    }
  };

  return { toggleBookmark, isLoading, error };
};
