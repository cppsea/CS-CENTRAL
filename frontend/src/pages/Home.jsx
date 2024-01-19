import { Stack } from "react-bootstrap";
import DescriptionBox from "../Components/DescriptionBox.jsx";

export default function Home() {
  return (
    <>
      <Stack gap={3} className="mt-5">
        <div className="w-100 pb-2" style={{ top: 100 }}>
          <DescriptionBox title={"What is CS Catalog?"}>
            CS Catalog is a helpful site where we are seeking to faciliate
            understanding and exposure to Machine Learning (ML), which has been
            an incredibly popular discipline these days. We are aiming at
            assisting those students who are uncertain where to start in ML. Our
            target users will be Computer Science students who are passionate
            about ML or are planning to get into this area.
          </DescriptionBox>
        </div>
      </Stack>
    </>
  );
}
