import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./Home.scss";
import UsersPage from "../UsersPage/UsersPage";
import ArticlesPage from "../ArticlesPage/ArticlesPage";

export default function Home() {
  const [isUsersView, setIsUsersView] = useState(true);
  const toggleEditView = (key) => {
    switch (key) {
      case "users":
        setIsUsersView(true);
        break;
      case "articles":
        setIsUsersView(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Tabs
        defaultActiveKey="users"
        className="tab-contents d-flex justify-content-left align-items-end"
        onSelect={(key) => toggleEditView(key)}
      >
        <Tab eventKey="users" className="users-tab" title="Users"></Tab>
        <Tab
          eventKey="articles"
          className="articles-tab"
          title="Articles"
        ></Tab>
      </Tabs>

      {isUsersView ? <UsersPage /> : <ArticlesPage />}
    </>
  );
}
