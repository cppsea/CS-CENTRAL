// error labels
const errorLabels = {
  username: "username",
  password: "password",
  email: "email",
  fname: "first name",
  lname: "last name",
  confirmPassword: "confirmed password",
};

// functions for validating input fields (add more if possible)
export const validationFunctions = {
  checkEmpty: (name = "", value1 = "", value2 = "") =>
    value1.length > 0 || `The ${errorLabels[name]} field should not be empty`,

  checkPasswordLength: (name = "", value1 = "", value2 = "") =>
    value1.length >= 8 ||
    value1.length === 0 ||
    `The password should be no less than 8 characters in length`,

  checkPasswordMatch: (name = "", value1 = "", value2 = "") =>
    value1 === value2 ||
    value1.length === 0 ||
    `The confirmed password does not match the password above`,
};

// an object containing input fields (keys)
// and their associated validation funciton (values as an array)
export const formValidation = {
  username: [validationFunctions.checkEmpty],
  fname: [validationFunctions.checkEmpty],
  lname: [validationFunctions.checkEmpty],
  email: [validationFunctions.checkEmpty],
  password: [
    validationFunctions.checkEmpty,
    validationFunctions.checkPasswordLength,
  ],
  confirmPassword: [
    validationFunctions.checkEmpty,
    validationFunctions.checkPasswordMatch,
  ],
};
