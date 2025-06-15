import { useEffect, useState, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Stack,
  Image,
} from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

import "../Settings.scss";
import * as auth from "../../auth/auth";
import PasswordChangeModal from "./PasswordChangeModal";
import ArrowMarker from "../../ArrowMarker/ArrowMarker";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEditProfile } from "../../../hooks/useEditProfile";
import toast from "react-hot-toast";
export default function ProfileEdit({
  profile = {
    fname: "Joe",
    lname: "",
    email: "jsmith@gmail.com",
    username: "jsmith10",
    password: "password",
    avatar: null,
  },
}) {
  const { user } = useAuthContext();

  const {
    editProfile,
    isLoading: editProfileIsLoading,
    error: editProfileError,
  } = useEditProfile();
  const [profileDataCopy, setProfileDataCopy] = useState(profile);
  const [profileData, setProfileData] = useState(profile);

  // keep track of chnanges
  const [isDataChanged, setIsDataChanged] = useState(false);

  //whether form has run through validation yet
  const [isValidated, setValidated] = useState(false);

  // error messages
  const [errorMessages, setErrorMessages] = useState({});

  const [editable, setEditable] = useState({
    fname: false,
    lname: false,
    email: false,
    username: false,
    password: false,
    avatar: false,
  });

  // handle input entered
  const handleInput = (e) => {
    const { name, value } = e.target;

    setIsDataChanged(true);
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  //profile avatar
  const DEFAULT_AVATAR = "/default_avatar.jpg";
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarImgSrc, setAvatarImgSrc] = useState(DEFAULT_AVATAR);
  const [avatarImgSrcCopy, setAvatarImgSrcCopy] = useState(DEFAULT_AVATAR);
  const imageFileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const imgFile = event.target.files[0];
    if (imgFile) {
      setIsDataChanged(true);
      setAvatarFile(imgFile);

      // Create a URL for the selected file and update
      const newImageSrc = URL.createObjectURL(imgFile);
      setAvatarImgSrc(newImageSrc);

      // Clean up the URL object when component unmounts
      return () => URL.revokeObjectURL(newImageSrc);
    }
  };

  //resets changes, edit modes, error messages
  const resetChanges = () => {
    setProfileData(profileDataCopy);
    setAvatarImgSrc(avatarImgSrcCopy);
    setEditable({
      fname: false,
      lname: false,
      email: false,
      username: false,
      password: false,
      avatar: false,
    });
    setErrorMessages({});
    setIsDataChanged(false);
    setAvatarFile(null);

    if (imageFileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const validateForm = () => {
    const newErrMessages = {};
    const { fname, lname, email, username, password } = auth.formValidation;
    const formValidation = { fname, lname, email, username, password };

    for (const fieldName in formValidation) {
      const validationFuncs = formValidation[fieldName];

      validationFuncs.forEach((validationFunc) => {
        let validateResult = validationFunc(fieldName, profileData[fieldName]);

        if (typeof validateResult === "string") {
          newErrMessages[fieldName] = validateResult;
        }
      });
    }

    setValidated(true);
    setErrorMessages(newErrMessages);
    return Object.keys(newErrMessages).length === 0;
  };

  //process profile data into FormData object

  const processProfileData = () => {
    const {
      fname: first_name,
      lname: last_name,
      email,
      username,
    } = profileData;
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("avatar", avatarFile);

    return formData;
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    console.log(errorMessages);
    if (isFormValid) {
      const formData = processProfileData();
      await editProfile(formData);

      if (!editProfileError) {
        setEditable({
          fname: false,
          lname: false,
          email: false,
          username: false,
          password: false,
          avatar: false,
        });
        setErrorMessages({});
        setIsDataChanged(false);
        toast.success("Profile successfully updated.");
      }
    } else {
      console.log("Invalid Form");
      toast.error("Invalid form data.");
    }
  };

  //load profile info
  useEffect(() => {
    if (user) {
      const { first_name, last_name, email, avatar, username } = user;
      if (avatar) {
        setAvatarImgSrc(avatar);
        setAvatarImgSrcCopy(avatar);
      }
      setProfileData({
        ...profileData,
        fname: first_name,
        lname: last_name,
        email: email,
        username: username,
      });
    }
  }, [user]);

  return (
    <Container className="my-3 mx-0" fluid>
      <h2 className="text-uppercase settings-header">Profile</h2>
      <div className="settings-divider"></div>

      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <div>
          {/** Profile Avatar Uploading */}
          <div className="my-3 settings-section-header-container">
            <div className="settings-arrow-marker-container">
              <ArrowMarker />
            </div>
            <h4 className="text-uppercase settings-section-header">
              Profile Avatar
            </h4>
          </div>
          <div className="position-relative">
            <Image
              src={avatarImgSrc}
              className="profile-avatar"
              roundedCircle
            />

            <div className="position-absolute avatar-edit-container">
              <label
                title="Upload Avatar"
                htmlFor="file-upload"
                className="settings-edit-button avatar-edit settings-edit-button-edit"
                onClick={() => setEditable({ ...editable, avatarUpload: true })}
              >
                <PencilFill />
              </label>
              <input
                ref={imageFileInputRef}
                id="file-upload"
                name="avatar"
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="my-3 settings-section-header-container">
            <div className="settings-arrow-marker-container">
              <ArrowMarker />
            </div>
            <h4 className="text-uppercase settings-section-header">General</h4>
          </div>

          <Row xs={1} sm={2} className="gy-3">
            <Col>
              <Form.Label className="settings-section-field-header">
                First name
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.fname}
                    name="fname"
                    value={profileData.fname}
                    placeholder="First name"
                    className={`settings-input ${
                      editable.fname
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("fname")}
                  />
                  <Button
                    title="Edit"
                    disabled={editable.fname}
                    className={`settings-edit-button ${
                      !editable.fname
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
                    onClick={() => setEditable({ ...editable, fname: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("fname")
                      ? errorMessages.fname
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Label className="settings-section-field-header">
                Last name
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.lname}
                    name="lname"
                    value={profileData.lname}
                    placeholder="Last name"
                    className={`settings-input ${
                      editable.lname
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("lname")}
                  />
                  <Button
                    title="Edit"
                    disabled={editable.lname}
                    className={`settings-edit-button  ${
                      !editable.lname
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
                    onClick={() => setEditable({ ...editable, lname: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("lname")
                      ? errorMessages.lname
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Label className="settings-section-field-header">
                Email
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.email}
                    name="email"
                    type="email"
                    value={profileData.email}
                    placeholder="Email"
                    className={`settings-input ${
                      editable.email
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("email")}
                  />
                  <Button
                    disabled={editable.email}
                    title="Edit"
                    className={`settings-edit-button  ${
                      !editable.email
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
                    onClick={() => setEditable({ ...editable, email: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("email")
                      ? errorMessages.email
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div>
          <div className="my-3 settings-section-header-container">
            <div className="settings-arrow-marker-container">
              <ArrowMarker />
            </div>
            <h4 className="text-uppercase settings-section-header">Login</h4>
          </div>
          <Row className="gy-3">
            <Col sm={12}>
              <Form.Label className="settings-section-field-header">
                Username
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.username}
                    name="username"
                    value={profileData.username}
                    className={`settings-input ${
                      editable.username
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("username")}
                  />
                  <Button
                    disabled={editable.username}
                    title="Edit"
                    className={`settings-edit-button  ${
                      !editable.username
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
                    onClick={() => setEditable({ ...editable, username: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("username")
                      ? errorMessages.username
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Label className="settings-section-field-header">
                Password
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.password}
                    name="password"
                    type="password"
                    value={profileData.password}
                    className={`settings-input ${
                      editable.password
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("password")}
                  />

                  <Button
                    disabled={editable.password}
                    title="Edit"
                    className={`settings-edit-button  ${
                      !editable.password
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
                    onClick={() => setEditable({ ...editable, password: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("password")
                      ? errorMessages.password
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>

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
                <Button
                  className="settings-confirm-button"
                  type="submit"
                  onClick={handleSubmit}
                >
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

        <PasswordChangeModal
          show={editable.password}
          onHide={() => setEditable({ ...editable, password: false })}
          className="border-0 bg-editable-input"
        />
      </Form>
    </Container>
  );
}
