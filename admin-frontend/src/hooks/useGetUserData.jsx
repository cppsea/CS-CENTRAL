import { useState } from "react";
import toast from "react-hot-toast";
export const useGetUserData = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const admin = JSON.parse(localStorage.getItem("admin"));

  const getUserData = async (userID) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/admin/users/${userID}`, {
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
        setError("No user found with this ID.");
        toast.error("No user found with this ID.");
      }
      return json.user;
    } catch (err) {
      setError("Something went wrong. Couldn't retrieve user data.");
    } finally {
      setIsLoading(false);
    }
  };

  return { getUserData, isLoading, error };
};
