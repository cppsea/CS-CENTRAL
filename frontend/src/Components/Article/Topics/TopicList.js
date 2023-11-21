//displays a list of topics

import { Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

//takes in a title for the list,
//and an array of objects that contain a topic and link
//the objects are of this format
/*
{
    topic: string,
    link: string
}
*/
export default function TopicList({ topicCategory, topicList }) {
  console.log(topicList);
  return (
    <Stack>
      {/*Topic Title*/}
      <Container>
        <Row>
          <Col md={12} className="d-flex">
            <Stack direction="horizontal">
              <h4 className="topic-list-title fw-bold">
                {topicCategory.toUpperCase()}
              </h4>
            </Stack>
          </Col>
        </Row>
      </Container>

      {/*Topic Link List */}
      <Container>
        <Row>
          <Col md={12} className="d-flex">
            <Stack gap={2} className="ps-4">
              {topicList.map(({ topic, link }) => (
                <Link className="topic-link fw-normal" to={link}>
                  {topic}
                </Link>
              ))}
            </Stack>
          </Col>
        </Row>
      </Container>
    </Stack>
  );
}
