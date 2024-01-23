import { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Stack,
} from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";
import "../Settings.scss";
import { Typeahead } from "react-bootstrap-typeahead";
export default function CustomizationsEdit({}) {
  //customization data
  const [custData, setCustData] = useState({
    interest_areas: [],
    article_level: [],
    technologies: [],
  });

  //state of options for each data
  const [interestAreasOptions, setInterestAreasOptions] = useState([]);
  const [articleLevelOptions, setArticleLevelOptions] = useState([]);
  const [technologiesOptions, setTechnologiesOptions] = useState([]);

  //simulating grabbing options from backend (if we are doing that)
  useEffect(() => {
    setInterestAreasOptions([
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
    ]);
    setArticleLevelOptions(["Beginner", "Proficient", "Advanced"]);
    setTechnologiesOptions(["Python", "C", "C++"]);
  }, []);

  // keep track of chnanges
  const [isDataChanged, setIsDataChanged] = useState(false);

  const [editable, setEditable] = useState({
    interest_areas: false,
    article_level: false,
    technologies: false,
  });

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
    console.log(custData);
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
            <AreasOfInterest
              selectedState={custData.interest_areas}
              options={interestAreasOptions}
              onChange={(selected) => {
                setCustData({ ...custData, interest_areas: selected });
              }}
              setEditable={setEditable}
              editable={editable}
            />
          </Col>
        </Row>
        {/*Difficulty Level */}

        <Row xs={12} className="my-4">
          <Col>
            <ArticleLevel
              selectedState={custData.article_level}
              options={articleLevelOptions}
              onChange={(selected) => {
                setCustData({ ...custData, article_level: selected });
              }}
              setEditable={setEditable}
              editable={editable}
            />
          </Col>
        </Row>
        {/*Interest in technologies*/}

        <Row xs={12} className="my-4">
          <Col>
            <TechnologiesOfInterest
              selectedState={custData.technologies}
              options={technologiesOptions}
              onChange={(selected) => {
                setCustData({ ...custData, technologies: selected });
              }}
              onInputChange={(e) => console.log(e)}
              setEditable={setEditable}
              editable={editable}
            />
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

const AreasOfInterest = ({
  selectedState,
  options,
  onChange,
  editable,
  setEditable,
}) => {
  return (
    <>
      <Form.Label>
        What are your areas of interest in Computer Science?
      </Form.Label>
      <Form.Group>
        <InputGroup hasValidation>
          <Typeahead
            id="areas-of-interest"
            multiple
            onChange={onChange}
            options={options}
            placeholder="Choose your areas of interest"
            selected={selectedState}
            className={`border border-dark rounded-start border-end-0 ${
              editable.interest_areas
                ? "bg-editable-input"
                : "bg-uneditable-input"
            }`}
            disabled={!editable.interest_areas}
          />
          <Button
            title="Edit"
            disabled={editable.interest_areas}
            className={`bg-transparent border-start-0 border-dark edit-button-hover-light ${
              !editable.interest_areas
                ? "enable-edit-color"
                : "disable-edit-color"
            }`}
            onClick={() => setEditable({ ...editable, interest_areas: true })}
          >
            <PencilFill />
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  );
};

const ArticleLevel = ({
  selectedState,
  options,
  onChange,
  editable,
  setEditable,
}) => {
  return (
    <>
      <Form.Label>
        What level are you looking for in the article content?
      </Form.Label>
      <Form.Group>
        <InputGroup hasValidation>
          <Typeahead
            id="article-level"
            single
            onChange={onChange}
            options={options}
            placeholder="Choose your article level"
            selected={selectedState}
            inputProps={{
              className: `border border-dark rounded-start border-end-0 ${
                editable.article_level
                  ? "bg-editable-input"
                  : "bg-uneditable-input"
              }`,
            }}
          />
          <Button
            title="Edit"
            disabled={editable.article_level}
            className={`bg-transparent border-start-0 border-dark edit-button-hover-light ${
              !editable.article_level
                ? "enable-edit-color"
                : "disable-edit-color"
            }`}
            onClick={() => setEditable({ ...editable, article_level: true })}
          >
            <PencilFill />
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  );
};

const TechnologiesOfInterest = ({
  selectedState,
  options,
  onChange,
  editable,
  setEditable,
}) => {
  return (
    <>
      <Form.Label>
        Which programming languages or technologies are you interested in
        exploring?
      </Form.Label>
      <Form.Group>
        <InputGroup hasValidation>
          <Typeahead
            id="technologies-of-interest"
            multiple
            onChange={onChange}
            options={options}
            placeholder="Choose the technologies you're interested in"
            selected={selectedState}
            className={`border border-dark rounded-start border-end-0 ${
              editable.technologies
                ? "bg-editable-input"
                : "bg-uneditable-input"
            }`}
            disabled={!editable.technologies}
          />
          <Button
            title="Edit"
            disabled={editable.technologies}
            className={`bg-transparent border-start-0 border-dark edit-button-hover-light ${
              !editable.technologies
                ? "enable-edit-color"
                : "disable-edit-color"
            }`}
            onClick={() => {
              setEditable({ ...editable, technologies: true });
            }}
          >
            <PencilFill />
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  );
};
