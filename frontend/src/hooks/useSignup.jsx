import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";


export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    // const api = process.env.REACT_APP_API_URL
    

    console.log("API URL from environment:", apiUrl); // Debug log

    const signup = async (username, user_password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3002/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, user_password })
            });

            let json;
            try {
                json = await response.json();
            } catch (err) {
                setError("Invalid response from server");
                setIsLoading(false);
                return;
            }

            if (!response.ok) {
                setError(json.error);
                setIsLoading(false);
                return;
            }

            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: json });

            navigate("/signin");
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
