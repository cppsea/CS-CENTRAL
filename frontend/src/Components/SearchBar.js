import { Card, Stack, Form, Button } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { Search } from "react-bootstrap-icons";

export default function SearchBar() {

  const description = "test";
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/articles", {
        mode: "no-cors",
        method: "GET",
      });
      //const jsonData = await response.json();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <MDBCol md="10">
        <Card className="rounded-pill">
          <Stack direction="horizontal">
            <Form.Control
              className="rounded-pill border-0"
              placeholder="Search articles here..."
              style={{ "box-shadow": "none" }}
            />
            <Search className="mx-1"></Search>
          </Stack>
        </Card>
      </MDBCol>
    </>
  );
}
