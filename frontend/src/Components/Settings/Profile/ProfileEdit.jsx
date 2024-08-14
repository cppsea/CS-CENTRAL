import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useAvatarStore } from "../../../hooks/zustand/useAvatarStore";
import ArrowMarker from "../../ArrowMarker/ArrowMarker";
import * as auth from "../../auth/auth";
import "../Settings.scss";
import PasswordChangeModal from "./PasswordChangeModal";

export default function ProfileEdit({
  profile = {
    id: 1,
    fname: "Joe",
    lname: "Smith",
    email: "jsmith@gmail.com",
    username: "jsmith10",
    password: "password",
  },
}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuthContext();
  const [profileDataCopy, setProfileDataCopy] = useState(profile);
  const [profileData, setProfileData] = useState(profile);
  const [isPending, setIsPending] = useState(false);

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
    avatarUpload: false,
  });

  // Manage the image URL for profile photo uploading
  const DEFAULT_AVATAR = "/default_avatar.jpg";
  const [imageSrc, setImageSrc] = useState(DEFAULT_AVATAR);
  const [imageSrcCopy, setImageSrcCopy] = useState(DEFAULT_AVATAR);
  const [fileInput, setFileInput] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const { avatar, setAvatar } = useAvatarStore();

  useEffect(() => {
    if (avatar) {
      setImageSrc(avatar);
      setImageSrcCopy(avatar);
    }
  }, [avatar]);

  // handle input entered
  const handleInput = (e) => {
    const { name, value } = e.target;

    setIsDataChanged(true);
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  //resets changes, edit modes, error messages
  const resetChanges = () => {
    setProfileData(profileDataCopy);
    setImageSrc(imageSrcCopy);
    setEditable({
      fname: false,
      lname: false,
      email: false,
      username: false,
      password: false,
      avatarUpload: false,
    });
    setErrorMessages({});
    setIsDataChanged(false);
    setFileInput(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrMessages = {};
    const formValidation = auth.formValidation;

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

    return Object.keys(errorMessages).length === 0;
  };

  // Handle file input change
  const handleImgFileChange = async (event) => {
    const imgFile = event.target.files[0];

    if (imgFile) {
      setIsDataChanged(true);
      setFileInput(imgFile);

      // Create a URL for the selected file
      const newImageSrc = URL.createObjectURL(imgFile);
      setImageSrc(newImageSrc); // Update the image source state

      // Clean up the URL object when component unmounts
      return () => URL.revokeObjectURL(newImageSrc);
    }
  };

  // Submit profile data to server
  const submitProfileData = async () => {
    try {
      setIsPending(true);
      // Upload the profile photo file to the server
      if (fileInput) {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append("image", fileInput);

        const response = await fetch(`${apiUrl}/api/images`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        });

        const res = await response.json();

        if (response.ok) {
          setAvatar(res.data.secure_url); // update the profile avatar state globally
          console.log(res.data);
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      }

      // Update profile data if any changes occur
      const response = await fetch(`${apiUrl}/api/users/${profile.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        setProfileDataCopy(profileData);
        setIsDataChanged(false);
        setEditable({
          ...editable,
          fname: false,
          lname: false,
          email: false,
          username: false,
          password: false,
          avatarUpload: false,
        });
      } else {
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsPending(false);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // window.location.reload();
    const isValidForm = validateForm();

    if (isValidForm) {
      console.log("Form is valid");
      await submitProfileData();
    } else {
      console.log("Form is invalid");
    }
  };

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
            <Image src={imageSrc} className="profile-avatar" roundedCircle />

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
                ref={fileInputRef}
                id="file-upload"
                name="image"
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleImgFileChange}
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
                  disabled={!isDataChanged || isPending}
                  type="submit"
                >
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
            <div>
              <Button
                className="settings-cancel-button"
                disabled={!isDataChanged || isPending}
                onClick={resetChanges}
              >
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
