import { Container, Image, Stack, Card } from "react-bootstrap";
import "./Summary.scss";
import machlearn from "../assets/machlearn.jpg";

export default function Summary({ sumtitle, subheader }) {
  return (
    <body>
      <Container>
        <button type="button" class="buttonsummary">
          <Card.Body>
          <Stack direction="horizontal" >
            <div>
              <Image src={machlearn} width={210} alt="machlearningimg" rounded/>
            </div>
            <div className="ps-3" >
              <Card.Title className="fs-2">{sumtitle}</Card.Title>
              <Card.Text className="fs-6">{subheader}</Card.Text>
            </div>
          </Stack>
          </Card.Body>
        </button>
      </Container>
    </body>
  );
}

