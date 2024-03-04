import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () =>
{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username,user_password) =>
    {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3002/api/users/login',
        {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, user_password })
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update authcontext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}