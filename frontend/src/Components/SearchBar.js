import { Card, Stack, Form, Button } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { Search } from "react-bootstrap-icons";
import { useState } from "react";

export default function SearchBar() {
  //const [description, setDescription] = useState("");
  const description = "test";
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/articles/?title=${description}`,
        { method: "GET" }
      );
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <MDBCol md="9">
        <Card className="rounded-pill">
          <Form onSubmit={onSubmitForm}>
            <Stack direction="horizontal">
              <Form.Control
                className="rounded-pill border-0"
                placeholder="Search articles here..."
                style={{ "box-shadow": "none" }}
              />
              <Form.Control
                id="hover_color"
                type="Submit"
                value={"Search"}
                className="bg-primary w-auto rounded-pill"
              />
              {/* <Search className="m-1"></Search> */}
            </Stack>
          </Form>
        </Card>
      </MDBCol>
    </>
  );
}
