import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileAvatarContext } from "../context/ProfileAvatarContext";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; //change to .env
  const { setProfileImg } = useContext(ProfileAvatarContext);
  // const api = process.env.REACT_APP_API_URL

  const login = async (username, user_password, error) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, user_password }),
      });
      console.log(apiUrl);

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        return;
      }

      if (response.ok) {
        //save user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        //update authcontext
        dispatch({ type: "LOGIN", payload: json });

        const fetchAvatar = await fetch(`${apiUrl}/api/profiles`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${json.token}`,
          },
        });

        const res = await fetchAvatar.json();

        if (fetchAvatar.ok) {
          console.log(res.profile_pic);
          setProfileImg(res.profile_pic);
        } else {
          setError(fetchAvatar.error);
        }

        setIsLoading(false);
        // console.log(localStorage);
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
