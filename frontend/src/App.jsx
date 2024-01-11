import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ArticleList from "./pages/ArticleList.jsx";
import ArticleView from "./pages/ArticleView.jsx";
import Signup from "./pages/SignPages/Signup.jsx";
import Signin from "./pages/SignPages/Signin.jsx";
import BasePage from "./pages/BasePage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route path="/" element={<Home />} />
          <Route path="article_search_results">
            <Route index element={<ArticleList />} />
            <Route path=":id" element={<ArticleList />} />
          </Route>
          <Route path="article_view">
            <Route index element={<ArticleView />} />
            <Route path=":name" element={<ArticleView />} />
          </Route>
          <Route
            path="*"
            element={<h1 className="text-center">404 - Page Not Found</h1>}
          />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
