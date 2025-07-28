import { useState } from "react";
import toast from "react-hot-toast";

export const useDeleteComment = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const deleteComment = async (commentId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/users/comments/${commentId}`,
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
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Couldn't delete comment.");
      toast.error("Something went wrong. Couldn't delete comment.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteComment, isLoading, error };
};
