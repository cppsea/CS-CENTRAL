import { Card, Container, Image, Row, Col, Button } from "react-bootstrap";
import { TrashFill, BookmarkPlusFill } from "react-bootstrap-icons";
import "./SavedArticleItem.scss";
export default function SavedArticleItem({
  articleImg,
  articleTitle,
  articleDesc,
  toBeDeleted,
  deleteToggler,
}) {
  return (
    // <Container
    //   gap={3}
    //   className={`${
    //     toBeDeleted ? "to-be-deleted-article" : "kept-article"
    //   } mb-3 p-3 rounded-4 mx-0`}
    // >
    //   <Row>
    //     <Col xs={3}>
    //       <Image
    //         src={articleImg}
    //         className="object-fit-contain w-100"
    //         height={100}
    //       />
    //     </Col>
    //     <Col xs={7}>
    //       <Card.Body>
    //         <Card.Title className="fw-bold">{articleTitle}</Card.Title>
    //         <Card.Text className="mt-2">{articleDesc}</Card.Text>
    //       </Card.Body>
    //     </Col>
    //     <Col xs={2} className="d-flex align-items-start justify-content-end">
    //       <Button className="bg-transparent border-0">
    //         {/*User will be able to either add back or remove the current article depending on article's state */}
    //         {toBeDeleted ? (
    //           <BookmarkPlusFill className="fs-4" onClick={deleteToggler} />
    //         ) : (
    //           <TrashFill className="fs-4" onClick={deleteToggler} />
    //         )}
    //       </Button>
    //     </Col>
    //   </Row>
    // </Container>
    <div className="saved-article">
      <div className="saved-article-image-container">
        <Image src={articleImg} className="saved-article-image" />
      </div>

      <span className="saved-article-title">{articleTitle}</span>
    </div>
  );
}
