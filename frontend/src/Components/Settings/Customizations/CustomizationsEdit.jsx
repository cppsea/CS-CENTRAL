import { useState, useEffect } from "react";
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
import ArrowMarker from "../../ArrowMarker/ArrowMarker";
export default function CustomizationsEdit({
  customerData = {
    interest_areas: ["Artificial Intelligence"],
    article_level: ["Beginner"],
    technologies: [],
  },
}) {
  const [oldCustData, setOldCustData] = useState(customerData);

  //customization data
  const [custData, setCustData] = useState(customerData);

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

  //resets changes, edit modes, error messages
  const resetChanges = () => {
    setCustData(oldCustData);
    setEditable({
      interest_areas: false,
      article_level: false,
      technologies: false,
    });
    setErrorMessages({});
    setIsDataChanged(false);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(custData);
  };

  return (
    <Container className="my-3 mx-0" fluid>
      <h2 className="settings-header">Customizations</h2>
      <div className="settings-divider"></div>
      <Form noValidate onSubmit={handleSubmit}>
        <div className="my-3 settings-section-header-container">
          <div className="settings-arrow-marker-container">
            <ArrowMarker />
          </div>
          <h4 className="settings-section-header">Customizations</h4>
        </div>

        {/*Area of Interest */}
        <Row xs={12} className="my-4">
          <Col>
            <AreasOfInterest
              selectedState={custData.interest_areas}
              options={interestAreasOptions}
              onChange={(selected) => {
                setCustData({ ...custData, interest_areas: selected });
                setIsDataChanged(true);
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
                setIsDataChanged(true);
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
                setIsDataChanged(true);
              }}
              onInputChange={(e) => console.log(e)}
              setEditable={setEditable}
              editable={editable}
            />
          </Col>
        </Row>
        {/*Show if any are in edit mode*/}
        {Object.values(editable).some((ele) => ele) && (
          <Stack
            direction="horizontal"
            gap={3}
            className="mt-3 justify-content-end "
          >
            {/*only show save if there are actual changes*/}
            {isDataChanged && (
              <div>
                <Button className="settings-confirm-button" type="submit">
                  Save
                </Button>
              </div>
            )}
            <div>
              <Button className="settings-cancel-button" onClick={resetChanges}>
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
      <Form.Label className="settings-section-field-header">
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
            className={`border-0 rounded-start ${
              editable.interest_areas
                ? "bg-editable-input"
                : "bg-uneditable-input"
            }`}
            disabled={!editable.interest_areas}
          />
          <Button
            title="Edit"
            disabled={editable.interest_areas}
            className={`settings-edit-button ${
              !editable.interest_areas
                ? "settings-edit-button-edit"
                : "settings-edit-button-unedit"
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
      <Form.Label className="settings-section-field-header">
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
              className: `border-0 ${
                editable.article_level
                  ? "bg-editable-input"
                  : "bg-uneditable-input"
              }`,
            }}
            disabled={!editable.article_level}
          />
          <Button
            title="Edit"
            disabled={editable.article_level}
            className={`settings-edit-button ${
              !editable.article_level
                ? "settings-edit-button-edit"
                : "settings-edit-button-unedit"
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
      <Form.Label className="settings-section-field-header">
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
            className={`rounded-start ${
              editable.technologies
                ? "bg-editable-input"
                : "bg-uneditable-input"
            }`}
            disabled={!editable.technologies}
          />
          <Button
            title="Edit"
            disabled={editable.technologies}
            className={`settings-edit-button ${
              !editable.technologies
                ? "settings-edit-button-edit"
                : "settings-edit-button-unedit"
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
