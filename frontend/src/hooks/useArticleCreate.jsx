import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useArticleCreate = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const createArticle = async (articleEditorData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/articles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(articleEditorData),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }

      // If there are already exisiting articles
      // temporary, replace with wherever articles are stored
      const exisitingArticles = [];

      exisitingArticles.push(json);

      // update stored articles with exisitingArticles

      navigate("/");
    } catch (err) {
      setError("Something went wrong. Couldn't create article.");
    } finally {
      setIsLoading(false);
    }
  };

  return { createArticle, isLoading, error };
};
