import { Card, Stack, Form } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { useState, useEffect } from "react";
import ArticleList from "../pages/ArticleList";
import { useParams } from "react-router-dom";

export default function SearchBar() {
  const [data, setData] = useState("");
  // const { keyword } = useParams();

  useEffect(() => {
    fetch("https://api.example.com/data") // modify the API link
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    alert(`The article you would like to search is: ${data}`);
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
              <Form.Control
                type="submit"
                value={"Search"}
                className="bg-primary w-auto rounded-pill"
              />
            </Stack>
          </Form>
        </Card>
      </MDBCol>
    </>
  );
}
