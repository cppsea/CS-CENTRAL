import { useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import LinkedDescriptionBox from "../Components/LinkedDescriptionBox.jsx";

export default function ArticleList({  }) {
  const [data,setData] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const [specificArticle, setSpecificArticle] = useState()
  const titleQuery = searchParams.get("title")
  //console.log(titleQuery);

  useEffect(()=>
  {
    fetch(`http://localhost:3002/api/articles/?title=${titleQuery}`)
      .then((res) => res.json()
      .then(data => setData(data)))
      .catch((error) =>{
        console.error("error fetching data");
      })

  /**     if(data && data.length > 0 ){
        const specificArticleId = data[0].id;
      fetch(`http://localhost:3002/api/articles/${specificArticleId}`)
        .then((res) => res.json())
        .then((specificArticle) => {
          setSpecificArticle(specificArticle);
          console.log("Specific article:", specificArticle);
        })
        .catch((error) =>{
          console.error("error fetching specific article");
        });
      } */
  },[titleQuery, setSearchParams])

  const { id } = useParams();

 /* const fetchArticle = async () => {
    fetch(`http://localhost:3002/api/articles/?title=${titleQuery}`)
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching item data:", error);
    });
  } */
  

  if (data == undefined )
  {
    return <>loading...</>
  }
  console.log(data);
  return (
    <>
      <div className="mt-5" >
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
              <LinkedDescriptionBox
              title={item.title}
              id={item.id}
              variant="secondary">
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
