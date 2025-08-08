import { Container } from "react-bootstrap";
import "./MyArticlesPage.scss";
import MyArticles from "../../Components/MyArticles/MyArticles";

export default function MyArticlesPage() {
  return (
    <Container fluid className="my-articles-container">
      <MyArticles />
    </Container>
  );
}
