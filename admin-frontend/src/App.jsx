import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BasePage from "./pages/BasePage";
import Home from "./pages/HomePage/Home";
import ArticleView from "./pages/ArticlesPage/ArticleView";
import SigninPage from "./pages/SignInPage/SignInPage";
import { useAuthContext } from "./hooks/useAuthContext";
import LoggedOutHomePage from "./pages/LoggedOutHome/LoggedOutHomePage";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import { useLoadingSpinner } from "./context/SpinnerContext";
import UserDataPage from "./pages/UsersPage/UserDataPage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import UsersPage from "./pages/UsersPage/UsersPage";
function App() {
  const { admin } = useAuthContext();
  const { spinnerIsShowing } = useLoadingSpinner();

  const ProtectedRoute = () => {
    const { admin, isAuthChecked } = useAuthContext();

    if (!isAuthChecked) return null;
    if (!admin) return <Navigate to="/" replace />;

    return <Outlet />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route path="/" element={admin ? <Home /> : <LoggedOutHomePage />} />
          {!admin && <Route path="/signin" element={<SigninPage />} />}
          <Route element={<ProtectedRoute />}>
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="articles/:articleID" element={<ArticleView />} />
            <Route path="users/:userID" element={<UserDataPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
      {spinnerIsShowing && <LoadingSpinner />}
    </>
  );
}

export default App;
