import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BasePage from "./pages/BasePage";
import Home from "./pages/HomePage/Home";
import ArticleView from "./pages/ArticleView";
import SigninPage from "./pages/SignInPage/SignInPage";
import { useAuthContext } from "./hooks/useAuthContext";
import LoggedOutHomePage from "./pages/LoggedOutHome/LoggedOutHomePage";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import { useLoadingSpinner } from "./context/SpinnerContext";
import UserDataPage from "./pages/UserDataPage";
function App() {
  const { admin } = useAuthContext();
  const { spinnerIsShowing } = useLoadingSpinner();

  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route path="/" element={admin ? <Home /> : <LoggedOutHomePage />} />
          {!admin && <Route path="/signin" element={<SigninPage />} />}
          <Route
            path="articles/:articleID"
            element={admin ? <ArticleView /> : <LoggedOutHomePage />}
          />
          <Route
            path="users/:userID"
            element={admin ? <UserDataPage /> : <LoggedOutHomePage />}
          />
        </Route>
      </Routes>
      <Toaster />
      {spinnerIsShowing && <LoadingSpinner />}
    </>
  );
}

export default App;
