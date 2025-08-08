import { useState } from "react";
import toast from "react-hot-toast";
export const useGiveAdmin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const giveAdmin = async (userId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/admin`, {
        method: "POST",
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

      toast.success("Successfully gave admin");
      return json;
    } catch (err) {
      setError("Something went wrong. Couldn't give admin.");
      toast.error("Something went wrong. Couldn't give admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return { giveAdmin, isLoading, error };
};
