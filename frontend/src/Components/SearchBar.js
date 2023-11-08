import { Card, Stack, Form } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { useState, useEffect } from "react";
import ArticleList from "../pages/ArticleList";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [data, setData] = useState("");
  // const { keyword } = useParams();

  useEffect((data) => {
    //console.log("useEffect");
    // fetch(`http://localhost:5000/api/articles/?title=${data}`) // modify the API link
    //   .then((response) => {response.json().then((articleData) => {})})
    //   .catch((error) => console.error(error));
  }, [data]);

  const submitHandler = async (event) => {
    event.preventDefault();
    // const response = await fetch(`http://localhost:5000/api/articles/?title=${data}`)
    // const jsonData = await response.json();
    // console.log(jsonData);
  };

  return (
    <>
      <MDBCol md="9">
        <Card className="rounded-pill">
          <Form onSubmit={submitHandler}>
            <Stack direction="horizontal">
              <Form.Control
                id="text_input"
                className="rounded-pill border-0"
                placeholder="Search articles here..."
                style={{ boxShadow: "none" }}
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <Link to={`/article_search_results/?title=${data}`}>
                <Form.Control
                  type="submit"
                  value={"Search"}
                  className="bg-primary w-auto rounded-pill"
                />
              </Link>
            </Stack>
          </Form>
        </Card>
      </MDBCol>
    </>
  );
}
