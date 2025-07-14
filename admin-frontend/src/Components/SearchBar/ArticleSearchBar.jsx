import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useSearchArticles } from "../../hooks/useSearchArticles";
import "./SearchBar.scss";

export default function ArticleSearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useState({
    id: "",
    author_id: "",
    title: "",
    is_published: false,
  });

  const { searchArticles } = useSearchArticles();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = {
      id: searchParams.id ? parseInt(searchParams.id) : null,
      author_id: searchParams.author_id
        ? parseInt(searchParams.author_id)
        : null,
      title: searchParams.title || null,
      is_published:
        searchParams.is_published === "" ? null : searchParams.is_published,
    };

    const results = await searchArticles(params);
    if (results) onSearch?.(results);
  };

  const handleShowAll = async () => {
    setSearchParams({
      id: "",
      author_id: "",
      title: "",
      is_published: false,
    });

    const results = await searchArticles({
      id: null,
      author_id: null,
      title: null,
      is_published: null,
    });

    if (results) onSearch?.(results);
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
        <Row className="align-items-center">
          <Form.Label column lg={1}>
            Published (Yes)
          </Form.Label>
          <Col>
            <Form.Check
              type="checkbox"
              name="is_published"
              checked={searchParams.is_published}
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
