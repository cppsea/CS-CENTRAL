import { useState } from "react";
import toast from "react-hot-toast";
export const useUnpublishArticle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const unpublishArticle = async (articleId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/articles/${articleId}/unpublish`,
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

      toast.success("Successfully unpublished.");
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't unpublish article.");
      toast.error("Something went wrong. Couldn't unpublish article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { unpublishArticle, isLoading, error };
};
