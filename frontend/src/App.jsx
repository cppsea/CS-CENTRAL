import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ArticleList from "./pages/ArticleList.jsx";
import ArticleView from "./pages/ArticleView.jsx";
import Signup from "./pages/SignPages/Signup.jsx";
import Signin from "./pages/SignPages/Signin.jsx";
import BasePage from "./pages/BasePage.jsx";
import SettingsPage from "./pages/Settings/SettingsPage.jsx";

import ProfileEdit from "./Components/Settings/Profile/ProfileEdit.jsx";
import SavedArticles from "./Components/Settings/SavedArticles/SavedArticles.jsx";
import CustomizationsEdit from "./Components/Settings/Customizations/CustomizationsEdit.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="article_search_results">
            <Route index element={<ArticleList />} />
            <Route path=":id" element={<ArticleList />} />
          </Route>
          <Route path="article_view">
            <Route index element={<ArticleView />} />
            <Route path=":name" element={<ArticleView />} />
          </Route>
          <Route path="settings" element={<SettingsPage />}>
            <Route index element={<ProfileEdit />} />
            <Route path="profile-settings" element={<ProfileEdit />} />
            <Route path="saved-articles" element={<SavedArticles />} />
            <Route path="customizations" element={<CustomizationsEdit />} />
          </Route>
          <Route
            path="*"
            element={<h1 className="text-center">404 - Page Not Found</h1>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
