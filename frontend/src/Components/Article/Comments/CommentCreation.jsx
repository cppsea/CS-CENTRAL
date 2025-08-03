import {
  Container,
  Form,
  Card,
  Col,
  Row,
  Image,
  Button,
} from "react-bootstrap";
import { useCommentCreate } from "../../../hooks/Comments/useCommentCreate";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function CommentCreation({ onCommentPosted }) {
  const { user } = useAuthContext();
  const { articleID = "" } = useParams();
  const [commentContent, setCommentContent] = useState();
  const { createComment } = useCommentCreate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting");
    if (!commentContent.trim()) return;

    try {
      await createComment({
        articleId: articleID,
        commentData: { content: commentContent },
      });

      setCommentContent("");

      if (onCommentPosted) {
        onCommentPosted();
      }
    } catch (err) {
      console.log("Failed to post comment.");
    }
  };

  return (
    <Container fluid className="p-0 comment-creation">
      <Card className="my-4 p-4 border-0 item-card">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col xs="auto">
              <Image
                src={user.avatar || DEFAULT_AVATAR}
                roundedCircle
                width={50}
                height={50}
              />
            </Col>
            <Col>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col xs="auto">
              <Button type="submit">Comment</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
