import { useState } from "react";
import toast from "react-hot-toast";

export const useSearchUsers = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const searchUsers = async (searchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/admin/users`, {
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
      setError("Something went wrong. Couldn't search for users.");
      toast.error("Something went wrong. Couldn't search for users.");
    } finally {
      setIsLoading(false);
    }
  };

  return { searchUsers, isLoading, error };
};
