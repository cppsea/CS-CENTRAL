import Header from "./Components/Header.js";
import DescriptionBox from "./Components/DescriptionBox.js";
import { Stack } from "react-bootstrap";

function App() {
  return (
    <>
      <Stack gap={3}>
        <div>
          <Header />
        </div>
        <div className="position-absolute w-100 pb-2" style={{ top: 100 }}>
          <DescriptionBox />
        </div>
      </Stack>
    </>
  );
}

export default App;
