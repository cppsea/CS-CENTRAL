import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useSearchArticles } from "../../hooks/useSearchArticles";
import "./SearchBar.scss";
import { useLoadingSpinner } from "../../context/SpinnerContext";
import { useSearchParams } from "react-router-dom";

export default function ArticleSearchBar({ onSearch }) {
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  const [urlSearchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useState({
    id: urlSearchParams.get("id") || "",
    author_id: urlSearchParams.get("author_id") || "",
    title: urlSearchParams.get("title") || "",
  });

  const { searchArticles } = useSearchArticles();

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = {
      id: searchParams.id ? parseInt(searchParams.id) : null,
      author_id: searchParams.author_id
        ? parseInt(searchParams.author_id)
        : null,
      title: searchParams.title || null,
    };

    showSpinner();
    const results = await searchArticles(params);
    if (results) onSearch?.(results, params);
    hideSpinner();
  };

  const handleShowAll = async () => {
    const emptyParams = {
      id: null,
      author_id: null,
      title: null,
    };

    setSearchParams({
      id: "",
      author_id: "",
      title: "",
    });

    const results = await searchArticles(emptyParams);
    if (results) onSearch?.(results, emptyParams);
  };

  return (
    <Container className="my-4 p-4 rounded search-container">
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Title
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={searchParams.title}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Author ID
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Author ID"
              name="author_id"
              value={searchParams.author_id}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Article ID
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Article ID"
              name="id"
              value={searchParams.id}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col xs="auto">
            <Button onClick={handleShowAll}>Show All</Button>
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
