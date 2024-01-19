import { useState, useRef, useEffect } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Stack,
} from "react-bootstrap";
import "../Settings.scss";

export default function CustomizationsEdit({}) {
  //customization data
  const [custData, setCustData] = useState({
    interest_area: "",
    article_level: "",
    technologies: "",
  });

  //state of options for each data
  const [interestAreaOptions, setInterestAreaOptions] = useState([]);
  const [articleLevelOptions, setArticleLevelOptions] = useState([]);
  const [technologiesOptions, setTechnologiesOptions] = useState([]);

  //simulating grabbing options from backend (if we are doing that)
  useEffect(() => {
    setInterestAreaOptions([
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
    ]);
    setArticleLevelOptions(["Beginner", "Proficient", "Advanced"]);
    setTechnologiesOptions(["Python", "C", "C++"]);
  }, []);

  // keep track of chnanges
  const [isDataChanged, setIsDataChanged] = useState(false);

  // handle input entered
  const handleInput = (e) => {
    const { name, value } = e.target;

    setIsDataChanged(true);
    console.log(custData);
    setCustData({
      ...custData,
      [name]: value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="my-3">
      <Form noValidate onSubmit={handleSubmit}>
        <h4 className="ps-2 py-1 border-start border-4 border-primary">
          Customize your choice of articles
        </h4>
        {/*Area of Interest */}
        <Row xs={12} className="my-4">
          <Col>
            <Form.Label>
              What is your area of interest in Computer Science?
            </Form.Label>
            <Form.Group>
              <InputGroup hasValidation>
                <Select
                  name={"interest_area"}
                  value={custData.interest_area}
                  options={interestAreaOptions}
                  onChange={handleInput}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        {/*Difficulty Level */}

        <Row xs={12} className="my-4">
          <Col>
            <Form.Label>
              What level are you looking for in the article content?
            </Form.Label>
            <Form.Group>
              <InputGroup hasValidation>
                <Select
                  name={"article_level"}
                  value={custData.article_level}
                  options={articleLevelOptions}
                  onChange={handleInput}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        {/*Interest in technologies*/}

        <Row xs={12} className="my-4">
          <Col>
            <Form.Label>
              Which programming languages or technologies are you interested in
              exploring?
            </Form.Label>
            <Form.Group>
              <InputGroup hasValidation>
                <Select
                  name={"technologies"}
                  value={custData.technologies}
                  options={technologiesOptions}
                  onChange={handleInput}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        {isDataChanged && (
          <Stack
            direction="horizontal"
            gap={3}
            className="mt-3 justify-content-end"
          >
            <div>
              <Button
                className="border-0 text-dark fw-medium"
                style={{ backgroundColor: "#24BEEF" }}
                type="submit"
              >
                Save
              </Button>
            </div>
            <div>
              <Button
                className="border-0 text-dark fw-medium"
                style={{ backgroundColor: "#B9B2B2" }}
                onClick={() => {
                  setIsDataChanged(false);
                  window.location.reload();
                }}
              >
                Cancel
              </Button>
            </div>
          </Stack>
        )}
      </Form>
    </Container>
  );
}

//Select component
const Select = ({ value, options, name, onChange }) => {
  return (
    <Form.Select
      defaultValue={value}
      name={name}
      className={`border border-dark bg-editable-input`}
      onChange={onChange}
    >
      <option value="">Select an option</option>
      {options.map((opText) => (
        <option key={opText} value={opText}>
          {opText}
        </option>
      ))}
    </Form.Select>
  );
};
