import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import "./SearchBar.scss";
import { useLoadingSpinner } from "../../context/SpinnerContext";
import { useSearchParams } from "react-router-dom";
import { useGetAdmins } from "../../hooks/useGetAdmins";

export default function UserSearchBar({ onSearch }) {
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  const { getAdmins } = useGetAdmins();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleShowAdmins = async () => {
    showSpinner();
    setSearchParams({ type: "admin" });
    const results = await getAdmins();
    if (results) onSearch?.(results, { type: "admin" });
    hideSpinner();
  };

  const [formParams, setFormParams] = useState({
    username: searchParams.get("username") || "",
    first_name: searchParams.get("first_name") || "",
    last_name: searchParams.get("last_name") || "",
    email: searchParams.get("email") || "",
    id: searchParams.get("id") ? parseInt(searchParams.get("id")) : "",
  });

  const { searchUsers } = useSearchUsers();

  const handleChange = (e) => {
    setFormParams({ ...formParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = {
      username: formParams.username || null,
      first_name: formParams.first_name || null,
      last_name: formParams.last_name || null,
      email: formParams.email || null,
      id: formParams.id ? parseInt(formParams.id) : null,
    };

    showSpinner();
    const results = await searchUsers(params);
    if (results) onSearch?.(results, params);
    hideSpinner();
  };

  const handleShowAll = async () => {
    const emptyParams = {
      username: null,
      first_name: null,
      last_name: null,
      id: null,
      email: null,
    };

    setFormParams({
      username: "",
      first_name: "",
      last_name: "",
      id: "",
      email: "",
    });

    showSpinner();
    const results = await searchUsers(emptyParams);
    if (results) onSearch?.(results, emptyParams);
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
              value={formParams.username}
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
              value={formParams.first_name}
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
              value={formParams.last_name}
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
              value={formParams.email}
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
              value={formParams.id}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col xs="auto">
            <Button onClick={handleShowAdmins}>Show Admins</Button>
          </Col>
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
