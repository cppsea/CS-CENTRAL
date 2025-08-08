import CommentCreation from "./CommentCreation";
import CommentsList from "./CommentsList";
import { useEffect, useState } from "react";
import { useGetCommentsByArticles } from "../../../hooks/Comments/useGetCommentsByArticle";
import { useParams } from "react-router-dom";
import "./Comments.scss";
import { useCommentDelete } from "../../../hooks/Comments/useCommentDelete";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Row, Col, Dropdown, Container } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";

export default function Comments({ setCommentCount }) {
  const { articleID = "" } = useParams();
  const { getCommentsByArticle } = useGetCommentsByArticles();
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext();

  const fetchComments = async () => {
    try {
      const result = await getCommentsByArticle(articleID);
      if (result?.comments) {
        const sortedComments = sortComments(result.comments);
        setComments(sortedComments);
        setCommentCount(result.comments.length);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const { deleteComment } = useCommentDelete();

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      fetchComments();
    } catch (err) {
      console.log(err);
      console.log("Error deleting comment ");
    }
  };

  const [sortBy, setSortBy] = useState("Newest");

  const sortComments = (commentsToSort) => {
    const sortedComments = [...commentsToSort].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortBy === "Newest" ? dateB - dateA : dateA - dateB;
    });
    return sortedComments;
  };

  useEffect(() => {
    fetchComments();
  }, [articleID]);

  useEffect(() => {
    setComments((prev) => sortComments(prev));
  }, [sortBy]);

  return (
    <>
      <Container fluid className="p-0 comments-container">
        <Row className="mt-5">
          <Col>
            <h2 className="text-uppercase">Comments</h2>
          </Col>
          <Col xs="auto" className="text-end d-flex">
            <Dropdown>
              <Dropdown.Toggle variant="link" className="text-decoration-none">
                {sortBy} <ChevronDown />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy("Newest")}>
                  Newest
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("Oldest")}>
                  Oldest
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        {!user && (
          <div className="my-5 text-center">
            <h4 className="text-muted">
              Log in or sign up to post your own comment!
            </h4>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <a href="/signin" className="btn btn-primary">
                Log In
              </a>
              <a href="/signup" className="btn btn-primary">
                Sign Up
              </a>
            </div>
          </div>
        )}
      </Container>
      {user && (
        <CommentCreation
          onCommentPosted={fetchComments}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}
      <CommentsList comments={comments} onDelete={handleDeleteComment} />
    </>
  );
}
