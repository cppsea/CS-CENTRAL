import { useState } from "react";
import toast from "react-hot-toast";
export const useGetAdmins = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const getAdmins = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
      }

      if (response.ok & (json.length === 0)) {
        setError("No admins found.");
        toast.error("No admins found.");
      }

      return { users: json.admins };
    } catch (err) {
      setError("Something went wrong. Couldn't retrieve admins.");
    } finally {
      setIsLoading(false);
    }
  };

  return { getAdmins, isLoading, error };
};
