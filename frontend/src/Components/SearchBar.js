import { Card, Stack, Form } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { Search } from "react-bootstrap-icons";
import { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const fetchArticles = (value) => {
    
  }

  return (
    <>
      <MDBCol md="10">
        <Card className="rounded-pill">
          <Stack direction="horizontal">
            <Form.Control
              className="rounded-pill border-0"
              placeholder="Search articles here..."
              style={{ "box-shadow": "none" }}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
            <Search className="mx-1"></Search>
          </Stack>
        </Card>
      </MDBCol>
    </>
  );
}
