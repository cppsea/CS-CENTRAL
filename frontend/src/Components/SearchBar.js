import { Card, Stack, Form } from "react-bootstrap";
import { MDBCol } from "mdbreact";
import DescriptionBox from "./DescriptionBox";
// import { Search } from "react-bootstrap-icons";
// import { useState } from "react";

export default function SearchBar() {
  //const [description, setDescription] = useState("");
  //description should be set to the text from the search bar
  const onSubmitForm = async (e) => {
    const description = document.getElementById("text_input");
    console.log(description.value);

    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/articles/?title=${description.value}`,
        { method: "GET" }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      //call the next page here with an argument of jsonData
      // for (let data of jsonData) {
      //   <DescriptionBox></DescriptionBox>
      // }
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
                id="text_input"
                className="rounded-pill border-0"
                placeholder="Search articles here..."
                style={{ boxShadow: "none" }}
              />
              <Form.Control
                type="submit"
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
