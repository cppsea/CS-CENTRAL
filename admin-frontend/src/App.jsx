import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BasePage from "./pages/BasePage";
import Home from "./pages/HomePage/Home";
import UsersPage from "./pages/UsersPage/UsersPage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import SigninPage from "./pages/SignInPage/SignInPage";
import { useAuthContext } from "./hooks/useAuthContext";
import LoggedOutHomePage from "./pages/LoggedOutHome/LoggedOutHomePage";
function App() {
  const { admin } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route path="/" element={admin ? <Home /> : <LoggedOutHomePage />} />
          {!admin && <Route path="/signin" element={<SigninPage />} />}
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
