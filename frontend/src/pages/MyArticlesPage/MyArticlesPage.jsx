import {
  Container,
  Row,
  Col,
  Dropdown,
  Image,
  Button,
  DropdownItem,
} from "react-bootstrap";
import { ThreeDotsVertical, Plus } from "react-bootstrap-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyArticlesPage.scss";

export default function MyArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Sample Article",
      image: null,
      isPublished: true,
    },
    {
      id: 2,
      title: "Sample Article",
      image: null,
      isPublished: false,
    },
  ]);

  const addNewArticle = () => {
    setArticles([
      ...articles,
      {
        id: articles.length + 1,
        title: "Sample Article",
        image: null,
        isPublished: false,
      },
    ]);
  };

  const handleDelete = (articleId) => {
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  const handlePublishToggle = (articleId) => {
    setArticles(
      articles.map((article) =>
        article.id === articleId
          ? { ...article, isPublished: !article.isPublished }
          : article
      )
    );
  };

  const handleEdit = () => {
    navigate(`/article-editor`);
  };

  return (
    <Container fluid className="my-articles-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="my-articles-title">My Articles</h1>
        <Button
          variant="primary"
          onClick={addNewArticle}
          className="add-article-button"
        >
          <Plus className="me-2" />
          Add New Article
        </Button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {articles.map((article) => (
          <Col key={article.id}>
            <div className="article-card">
              <div className="article-image-container">
                <Image
                  src={
                    article.image ||
                    "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
                  }
                  className="article-image"
                />
                <span
                  className={`status ${
                    article.isPublished ? "published" : "draft"
                  }`}
                >
                  {article.isPublished ? "Published" : "Draft"}
                </span>
                <Dropdown className="article-actions">
                  <Dropdown.Toggle variant="link" id="dropdown-actions">
                    <ThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handlePublishToggle(article.id)}
                    >
                      {article.isPublished ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(article.id)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="article-title">{article.title}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
