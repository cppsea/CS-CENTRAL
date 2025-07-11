import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BasePage from "./pages/BasePage";
import Home from "./pages/HomePage/Home";
import UsersPage from "./pages/UsersPage/UsersPage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
