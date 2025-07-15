import { useState } from "react";
import toast from "react-hot-toast";

export const useUnpublishArticle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const unpublishArticle = async (articleId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/articles/${articleId}/unpublish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ id: articleId }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
        return;
      }
    } catch (err) {
      setError("Something went wrong. Couldn't publish article.");
      toast.error("Something went wrong. Couldn't publish article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { unpublishArticle, isLoading, error };
};
