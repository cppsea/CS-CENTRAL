import { useState } from "react";
import toast from "react-hot-toast";

export const useSearchArticles = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const searchArticles = async (searchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/admin/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        body: JSON.stringify(searchParams),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
        return;
      }

      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't search for articles.");
    } finally {
      setIsLoading(false);
    }
  };

  return { searchArticles, isLoading, error };
};
