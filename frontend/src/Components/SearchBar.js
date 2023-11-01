import { Card, Stack, Form, Button } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import { Search } from "react-bootstrap-icons";
import { useState } from "react";
<<<<<<< HEAD

export default function SearchBar() {
  const [input, setInput] = useState("");
  const fetchArticles = (value) => {
=======


export default function SearchBar() {

  //const [description, setDescription] = useState("");
  const description = "test"
  const onSubmitForm = async e =>
  {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/articles/?title=${description}`, {method: "GET"});
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
>>>>>>> 7529276db42faea9310ede7573ffc6c2a21fd635
    
  }

  return (
    <>
      <MDBCol md="10">
        <Card className="rounded-pill">
          <Stack direction="horizontal">
<<<<<<< HEAD
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
=======
            <Form onSubmit={onSubmitForm}>
                <Form.Control type = "text" className="rounded-pill border-0" placeholder="Search articles here..."/>
                <Button type = "submit">
                  <Search className="mx-1"></Search>
                </Button>
            </Form>
>>>>>>> 7529276db42faea9310ede7573ffc6c2a21fd635
          </Stack>
        </Card>
      </MDBCol>
    </>
  );
}
