import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useArticleDelete = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const deleteArticle = async (articleId) => {
    if (!user) {
      toast.error("Please log in or create an account");
      navigate("/signin");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/articles/${articleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
        return;
      }

      if (response.ok) {
        toast.success("Article deleted!");
        navigate("/article-editor");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Couldn't delete article.");
      toast.error("Something went wrong. Couldn't delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteArticle, isLoading, error };
};
