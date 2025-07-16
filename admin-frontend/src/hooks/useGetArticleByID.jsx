import { useState } from "react";
import toast from "react-hot-toast";
export const useGetArticleByID = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const getArticleByID = async (articleId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/articles/${articleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
        }
      );

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
      }

      if (response.ok & (json.length === 0)) {
        setError("No articles found with this ID.");
        toast.error("No articles found with this ID.");
      }
      return json.article;
    } catch (err) {
      setError("Something went wrong. Couldn't retrieve article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { getArticleByID, isLoading, error };
};
