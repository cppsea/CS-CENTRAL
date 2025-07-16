import { Card, Container, Stack, Row, Col, Dropdown } from "react-bootstrap";
import "./ListView.scss";
import { useDeleteArticle } from "../../hooks/useDeleteArticle";
import { useUnpublishArticle } from "../../hooks/useUnpublishArticle";
import { usePublishArticle } from "../../hooks/usePublishArticle";
import { useLoadingSpinner } from "../../context/SpinnerContext";
import { useNavigate } from "react-router-dom";
export default function ArticlesList({ articles, setArticles }) {
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useLoadingSpinner();
  const {
    deleteArticle,
    isLoading: deleteIsLoading,
    error: deleteError,
  } = useDeleteArticle();
  const {
    unpublishArticle,
    isLoading: unpublishIsLoading,
    error: unpublishError,
  } = useUnpublishArticle();
  const {
    publishArticle,
    isLoading: publishIsLoading,
    error: publishError,
  } = usePublishArticle();

  const handleDeleteArticle = async (id) => {
    showSpinner();
    let json = await deleteArticle(id);

    if (json && !json.error) {
      setArticles((prev) => prev.filter((article) => article.id !== id));
    }
    hideSpinner();
  };

  const handleUnpublishArticle = async (id) => {
    showSpinner();
    let json = await unpublishArticle(id);

    if (json && !json.error) {
      setArticles((prev) =>
        prev.map((article) =>
          article.id !== id ? article : { ...article, is_published: false }
        )
      );
    }
    hideSpinner();
  };

  const handlePublishArticle = async (id) => {
    showSpinner();
    let json = await publishArticle(id);

    if (json && !json.error) {
      setArticles((prev) =>
        prev.map((article) =>
          article.id !== id ? article : { ...article, is_published: true }
        )
      );
    }
    hideSpinner();
  };
  return (
    <Container className="p-0">
      <Stack>
        {articles?.length === 0 ? (
          <div className="text-muted my-4 display-6">No articles found.</div>
        ) : (
          <div className="text-muted my-4 display-6">Displaying results...</div>
        )}
        {articles &&
          articles.map((article) => (
            <Card
              key={article.id}
              className="my-4 p-4 border-0 item-card"
              onClick={() => navigate(`/articles/${article.id}`)}
            >
              <Row className="align-items-center">
                <Col>
                  <div className="fw-semibold">
                    {article.header.blocks[0].data.text}
                    <span className="fw-normal"> | {article.author}</span>
                  </div>
                  {article.published_at && (
                    <div className="text-muted text-truncate">
                      {new Date(article.published_at).toLocaleDateString()}
                    </div>
                  )}
                </Col>
                <Col
                  xs="auto"
                  className="text-end d-flex align-items-center gap-3"
                >
                  <div>{article.id}</div>
                  <div className="fw-semibold">
                    {article.is_published ? "Published" : "Unpublished"}
                  </div>
                  <Dropdown onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Toggle variant="link" />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handlePublishArticle(article.id)}
                      >
                        Publish
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleUnpublishArticle(article.id)}
                      >
                        Unpublish
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Card>
          ))}
      </Stack>
    </Container>
  );
}
