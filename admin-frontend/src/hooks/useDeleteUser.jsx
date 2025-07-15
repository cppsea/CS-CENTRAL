import { useState } from "react";
import toast from "react-hot-toast";
export const useDeleteUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const deleteUser = async (articleId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/admin/users/${articleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
        return;
      }

      toast.success("Successfully deleted");
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't delete user.");
      toast.error("Something went wrong. Couldn't delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteUser, isLoading, error };
};
