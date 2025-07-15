import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import "./SearchBar.scss";
import { useLoadingSpinner } from "../../context/SpinnerContext";

export default function UserSearchBar({ onSearch }) {
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  const [searchParams, setSearchParams] = useState({
    username: "",
    first_name: "",
    last_name: "",
    id: "",
    email: "",
  });

  const { searchUsers } = useSearchUsers();

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = {
      username: searchParams.username || null,
      first_name: searchParams.first_name || null,
      last_name: searchParams.last_name || null,
      email: searchParams.email || null,
      id: searchParams.id ? parseInt(searchParams.id) : null,
    };

    const results = await searchUsers(params);
    if (results) onSearch?.(results);
  };

  const handleShowAll = async () => {
    setSearchParams({
      username: "",
      first_name: "",
      last_name: "",
      id: "",
      email: "",
    });

    showSpinner();
    const results = await searchUsers({
      username: null,
      first_name: null,
      last_name: null,
      id: null,
      email: null,
    });

    if (results) onSearch?.(results);
    hideSpinner();
  };

  return (
    <Container className="my-4 p-4 rounded search-container">
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Username
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={searchParams.username}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            First Name
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="first_name"
              value={searchParams.first_name}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Last Name
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={searchParams.last_name}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Email
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={searchParams.email}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            ID
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="ID"
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
