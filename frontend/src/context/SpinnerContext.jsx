import { useState, useContext, createContext } from "react";

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
  const [spinnerIsShowing, setSpinnerIsShowing] = useState(false);
  const showSpinner = () => setSpinnerIsShowing(true);
  const hideSpinner = () => setSpinnerIsShowing(false);

  return (
    <SpinnerContext.Provider
      value={{ spinnerIsShowing, showSpinner, hideSpinner }}
    >
      {children}
    </SpinnerContext.Provider>
  );
};

export const useLoadingSpinner = () => useContext(SpinnerContext);
