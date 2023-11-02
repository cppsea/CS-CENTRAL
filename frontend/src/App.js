import Header from "./Components/Header.js";
import DescriptionBox from "./Components/DescriptionBox.js";
import { Stack } from "react-bootstrap";
import logo from "./assets/logo.png";
import ML_logo from "./assets/ml_brain.jpg";

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="artice_list" element={<ArticleCard />} />
          <Route path="article_view" element={<ArticleView />} />
          <Route path="my_profile" element={<Profile />} />
        </Routes>
      </BrowserRouter> */}
      <Stack gap={3}>
        <div>
          <Header />
        </div>
        <div className="position-absolute w-100 pb-2" style={{ top: 100 }}>
          <DescriptionBox
            title={"What is CS Catalog?"}
            imgSrc={logo}
            width={30}
            height={15}
          >
            CS Catalog is a helpful site where we are seeking to faciliate
            understanding and exposure to Machine Learning (ML), which has been
            an incredibly popular discripline these days. We are aiming at
            assisting those students who are uncertain where to start in ML. Our
            target users will be Computer Science students who are passionate
            about ML or are planning to get into this area.
          </DescriptionBox>
        </div>
      </Stack>
    </>
  );
}

export default App;
