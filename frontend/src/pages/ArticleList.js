import { useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Components/Header.js";
import LinkedDescriptionBox from "../Components/LinkedDescriptionBox.js";

export default function ArticleList({  }) {
  const [data,setData] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const titleQuery = searchParams.get("title")
  //console.log(titleQuery);

  useEffect(()=>
  {
    fetch(`http://localhost:3002/api/articles/?title=${titleQuery}`)
      .then((res) => res.json())
      .then((res) => setData(res))
            },[titleQuery])
  const { id } = useParams();

  if (data == undefined)
  {
    return <>loading...</>
  }

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
                <h4 className="ps-4">Search Results: "{titleQuery}"</h4>
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
