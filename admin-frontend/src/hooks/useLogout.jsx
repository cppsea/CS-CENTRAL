import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  {
    const { dispatch } = useAuthContext();

    const logout = () => {
      //remove localstorage
      localStorage.removeItem("admin");

      //logout for authcontext
      dispatch({ type: "LOGOUT" });
    };

    return { logout };
  }
};
