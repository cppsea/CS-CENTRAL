import { useState } from "react";
import toast from "react-hot-toast";

export const useGetCommentsByUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const getCommentsByUser = async (userID) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/users/${userID}/comments`,
        {
          method: "GET",
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
      return json;
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Couldn't get user's comment.");
      toast.error("Something went wrong. Couldn't get user's comment.");
    } finally {
      setIsLoading(false);
    }
  };

  return { getCommentsByUser, isLoading, error };
};
