import { useState } from "react";
import { Card, Col, Container, Stack, Row, Tab, Tabs } from "react-bootstrap";
import "./Home.scss";
import UsersPage from "../UsersPage/UsersPage";
import ArticlesPage from "../ArticlesPage/ArticlesPage";

export default function Home() {
  return (
    <Container
      style={{
        padding: "210px",
      }}
    >
      <Stack className="d-flex justify-content-center align-items-center">
        <h1 className="text-center w-100 mb-4">
          Welcome to the admin portal of CS Central.
        </h1>
        <h4 className="text-muted">
          You can use the header to manage users, articles, and more.
        </h4>
      </Stack>
    </Container>
  );
}
