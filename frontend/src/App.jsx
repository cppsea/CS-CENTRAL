import { Route, Routes } from "react-router-dom";
import ArticleList from "./pages/ArticleList.jsx";
import ArticleView from "./pages/ArticleView.jsx";
import BasePage from "./pages/BasePage.jsx";
import Home from "./pages/Home.jsx";
import Signin from "./pages/SignPages/Signin.jsx";
import Signup from "./pages/SignPages/Signup.jsx";

import ProfileEdit from "./Components/Settings/Profile/ProfileEdit.jsx";

function navigate(url){
  window.location.href = url
}

async function auth(){
  try {

    /**const response = await fetch('http://localhost:3002/api/users/login',
        {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, user_password })
        }) */

    const response = await fetch('http://127.0.0.1:3002/oauth', 
      {
         method: 'post' 
        });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    navigate(data.url);
  } catch (error) {
    console.error('Error during authentication:', error);
    // Handle the error as needed (e.g., show an error message to the user).
  }
}



function App() {
  return (
    <>
    <button type="button" onClick={()=> auth()}>Google</button>
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
          <Route path="profile-settings" element={<ProfileEdit />} />
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
