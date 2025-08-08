import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCommentDelete = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const deleteComment = async (commentId) => {
    if (!user) {
      toast.error("Please log in or create an account");
      navigate("/signin");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/articles/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
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
