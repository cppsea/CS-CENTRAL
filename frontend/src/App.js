import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import ArticleList from "./pages/ArticleList.js";
import ArticleView from "./pages/ArticleView.js";
import Signin from "./Components/Signin/Signin.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/article_search_results">
          <Route index element={<ArticleList />} />
          <Route path=":id" element={<ArticleList />} />
        </Route>
        <Route path="/article_view">
          <Route index element={<ArticleView />} />
          <Route path=":name" element={<ArticleView />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="text-center">404 - Page Not Found</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
