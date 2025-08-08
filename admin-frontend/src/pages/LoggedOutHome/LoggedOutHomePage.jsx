import { Button, Container, Nav, Stack } from "react-bootstrap";

export default function LoggedOutHomePage() {
  return (
    <>
      <Container
        style={{
          padding: "200px",
        }}
      >
        <Stack className="d-flex justify-content-center align-items-center">
          <h1 className="text-center w-100 mb-4">
            Welcome to the admin portal to CS Central.
          </h1>
          <Button className={"px-4 py-2 mt-4"} style={{ maxWidth: "200px" }}>
            <Nav.Link href="/signin">Login</Nav.Link>
          </Button>
        </Stack>
      </Container>
    </>
  );
}
