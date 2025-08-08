import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const useGetArticleByID = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const getArticleByID = async (articleId) => {
    setIsLoading(true);
    setError(null);

    let article = null;
    try {
      const response = await fetch(`${apiUrl}/api/articles/${articleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
      }

      if (response.ok & (json.length === 0)) {
        setError("No articles found with this ID.");
        toast.error("No articles found with this ID.");
      }
      article = json[0];
    } catch (err) {
      setError("Something went wrong. Couldn't retrieve article.");
    } finally {
      setIsLoading(false);
    }

    return article;
  };

  return { getArticleByID, isLoading, error };
};
