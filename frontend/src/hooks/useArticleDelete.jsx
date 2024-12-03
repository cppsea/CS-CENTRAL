import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useArticleDelete = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const deleteArticle = async (articleId, error) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/createarticle`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }

      // If there are already exisiting articles
      const exisitingArticles =
        JSON.parse(localStorage.getItem("articles")) || [];

      const updatedArticles = exisitingArticles.filter(
        (article) => article.id === articleId
      );

      localStorage.setItem("articles", JSON.stringify(updatedArticles));

      navigate("/");
    } catch (err) {
      setError("Something went wrong. Couldn't delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteArticle, isLoading, error };
};
