import { useState } from "react";
import toast from "react-hot-toast";
export const useRemoveAdmin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const removeAdmin = async (userId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/admin`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
        return;
      }

      toast.success("Successfully removed admin");
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't remove admin.");
      toast.error("Something went wrong. Couldn't remove admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return { removeAdmin, isLoading, error };
};
