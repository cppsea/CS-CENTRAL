import { Row, Col, Dropdown, Image, Button } from "react-bootstrap";
import { ThreeDotsVertical, Plus } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyArticles.scss";

import { useGetMyArticles } from "../../hooks/useGetMyArticles";
import { useArticleDelete } from "../../hooks/useArticleDelete";
import { usePublishArticle } from "../../hooks/usePublishArticle";
import { useUnpublishArticle } from "../../hooks/useUnpublishArticle";

export default function MyArticles() {
  const navigate = useNavigate();

  const { getMyArticles } = useGetMyArticles();
  const { deleteArticle } = useArticleDelete();
  const { publishArticle } = usePublishArticle();
  const { unpublishArticle } = useUnpublishArticle();

  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const data = await getMyArticles();
    if (data) setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addNewArticle = () => {
    navigate(`/article-editor`);
  };

  const handleDelete = async (articleId) => {
    await deleteArticle(articleId);
    fetchArticles();
  };

  const handlePublishToggle = async (articleId, isPublished) => {
    if (isPublished) {
      await unpublishArticle(articleId);
    } else {
      await publishArticle(articleId);
    }
    fetchArticles();
  };

  const handleEdit = () => {
    navigate(`/article-editor`);
  };

  return (
    <>
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
                    article.is_published ? "published" : "draft"
                  }`}
                >
                  {article.is_published ? "Published" : "Draft"}
                </span>
                <Dropdown className="article-actions">
                  <Dropdown.Toggle variant="link" id="dropdown-actions">
                    <ThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        handlePublishToggle(article.id, article.is_published)
                      }
                    >
                      {article.is_published ? "Unpublish" : "Publish"}
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
    </>
  );
}
