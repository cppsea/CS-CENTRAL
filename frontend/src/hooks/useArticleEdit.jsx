import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useArticleEdit = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const editArticle = async (articleId, articleEditorData, error) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/createarticle`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleEditorData }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }

      // If there are already exisiting articles
      const exisitingArticles =
        JSON.parse(localStorage.getItem("articles")) || [];

      const updatedArticles = exisitingArticles.map((article) =>
        article.id === articleId ? { ...article, ...json } : article
      );

      localStorage.setItem("articles", JSON.stringify(updatedArticles));

      navigate("/");
    } catch (err) {
      setError("Something went wrong. Couldn't edit article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { editArticle, isLoading, error };
};
