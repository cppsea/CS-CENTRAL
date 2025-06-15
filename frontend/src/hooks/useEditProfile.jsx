import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useEditProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const editProfile = async (profileFormData) => {
    if (!user) {
      navigate("/signin");
      toast.error("Please log in or create an account.");
    }
    setIsLoading(true);
    setError(null);

    //uses formdata instead of json
    try {
      const response = await fetch(`${apiUrl}/api/users`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: profileFormData,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }

      //update user in auth context with updated user info
      localStorage.setItem(
        "user",
        JSON.stringify({ ...json.user, token: user.token })
      );
      return json;
    } catch (err) {
      setError("Something went wrong. Could not update profile.");
      toast.error("Something went wrong. Could not update profile.");
    } finally {
      setIsLoading(false);
    }
  };
  return { editProfile, isLoading, error };
};
