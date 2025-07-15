import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; //change to .env
  // const api = process.env.REACT_APP_API_URL

  const login = async (user, error) => {
    setIsLoading(true);
    setError(null);

    const { username, password } = user;
    try {
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }
      if (response.ok) {
        //save user to local storage
        localStorage.setItem("admin", JSON.stringify(json));

        //update authcontext
        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
        console.log(localStorage);
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
