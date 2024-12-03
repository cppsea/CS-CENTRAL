import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useArticleCreate = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const createArticle = async (articleEditorData, error) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/createarticle`, {
        method: "POST",
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

      exisitingArticles.push(json);

      localStorage.setItem("articles", JSON.stringify(exisitingArticles));

      navigate("/");
    } catch (err) {
      setError("Something went wrong. Couldn't create article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { createArticle, isLoading, error };
};
