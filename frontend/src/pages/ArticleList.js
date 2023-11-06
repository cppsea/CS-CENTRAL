import Header from "../Components/Header.js";
import { Stack, Card } from "react-bootstrap";
import LinkedDescriptionBox from "../Components/LinkedDescriptionBox.js";
import { useParams } from "react-router-dom";

export default function ArticleList({ data }) {
  const { id } = useParams();
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="position-absolute w-100 pb-2" style={{ top: 100 }}>
        <Stack gap={3}>
          <div>
            <Card style={{ border: "none" }}>
              <Card.Body>
                <h4 className="ps-4">Search Results: "{id}"</h4>
              </Card.Body>
            </Card>
          </div>
          {data.map((item) => (
            <div>
              <LinkedDescriptionBox title={item.title} variant="secondary">
                {item.description}
              </LinkedDescriptionBox>
            </div>
          ))}
          {/* <div>
            <LinkedDescriptionBox
              title={"Intro to Machine Learning"}
              variant="secondary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </LinkedDescriptionBox>
          </div>
          <div>
            <LinkedDescriptionBox
              title={"Regressional Analysis"}
              variant="secondary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </LinkedDescriptionBox>
          </div>
          <div>
            <LinkedDescriptionBox
              title={"Regressional Analysis"}
              variant="secondary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </LinkedDescriptionBox>
          </div>
          <div>
            <LinkedDescriptionBox
              title={"Regressional Analysis"}
              variant="secondary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </LinkedDescriptionBox>
          </div>
          <div>
            <LinkedDescriptionBox
              title={"Regressional Analysis"}
              variant="secondary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </LinkedDescriptionBox>
          </div> */}
        </Stack>
      </div>
    </>
  );
}
