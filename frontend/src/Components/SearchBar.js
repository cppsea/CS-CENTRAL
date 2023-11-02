import { Card, Stack, Form } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { useState } from "react";

export default function SearchBar() {
  const [name, setName] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    alert(`The article you would like to search is: ${name}`);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
