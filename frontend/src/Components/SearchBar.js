import { Card, Stack, Form } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { Search } from "react-bootstrap-icons";

export default function SearchBar() {
  return (
    <>
      <MDBCol md="10">
        <Card className="rounded-pill">
          <Stack direction="horizontal">
            <Form.Control
              className="rounded-pill border-0"
              placeholder="Search articles here..."
            />
            <Search className="mx-1"></Search>
          </Stack>
        </Card>
      </MDBCol>
    </>
  );
}
