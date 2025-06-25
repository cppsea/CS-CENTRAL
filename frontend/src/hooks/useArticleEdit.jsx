import { useState } from "react";
import { useNavigate } from "react-router-dom";
import processEditorData from "./ArticleEditorDataProcessor/ArticleEditorDataProcessor";
import toast from "react-hot-toast";

export const useArticleEdit = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const editArticle = async (articleId, articleEditorData) => {
    setIsLoading(true);
    setError(null);
    let article = null;

    let processedArticle = await processEditorData(articleEditorData);

    try {
      const response = await fetch(`${apiUrl}/api/articles/${articleId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: processedArticle,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
        return;
      }

      article = json.article;
    } catch (err) {
      setError("Something went wrong. Couldn't edit article.");
      toast.error("Something went wrong. Couldn't edit article.");
    } finally {
      setIsLoading(false);
    }

    return article;
  };

  return { editArticle, isLoading, error };
};
