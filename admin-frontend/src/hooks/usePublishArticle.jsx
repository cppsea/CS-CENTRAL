import { useState } from "react";
import toast from "react-hot-toast";
export const usePublishArticle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const publishArticle = async (articleId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/articles/${articleId}/publish`,
        {
          method: "PATCH",
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
        return;
      }

      toast.success("Successfully published.");
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't publish article.");
      toast.error("Something went wrong. Couldn't publish article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { publishArticle, isLoading, error };
};
