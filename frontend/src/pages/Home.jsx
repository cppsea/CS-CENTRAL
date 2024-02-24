import { Container, Stack } from "react-bootstrap";
import AppTitle from "../Components/Home/AppTitle/AppTitle";
import MainArticle from "../Components/Home/MainArticle/MainArticle";

export default function Home() {
  return (
    <>
      <Container fluid className="flex-grow-1 mx-0">
        <Stack className="my-5">
          <AppTitle />
          <MainArticle />
        </Stack>
      </Container>
    </>
  );
}
