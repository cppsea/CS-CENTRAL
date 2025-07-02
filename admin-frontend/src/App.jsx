import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BasePage from "./pages/BasePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
