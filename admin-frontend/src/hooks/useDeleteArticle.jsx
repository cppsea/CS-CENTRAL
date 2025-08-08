import { useState } from "react";
import toast from "react-hot-toast";
export const useDeleteArticle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const deleteArticle = async (articleId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/articles/${articleId}`,
        {
          method: "DELETE",
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

      toast.success("Successfully deleted");
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't delete article.");
      toast.error("Something went wrong. Couldn't delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteArticle, isLoading, error };
};
