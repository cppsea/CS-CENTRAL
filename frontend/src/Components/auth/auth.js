// error labels
const errorLabels = {
  username: "username",
  password: "password",
  oldPassword: "old password",
  newPassword: "new password",
  confirmNewPassword: "confirm new password",
  email: "email",
  fname: "first name",
  lname: "last name",
  confirmPassword: "confirm password",
};

// Regex patterns
const patterns = {
  username: /^[a-z\d]{5,12}$/i,
  password: /^[\d\w@-]{8,20}$/i,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{3,8})$/,
  //      email_address @  domain    .    com
};

// functions for validating input fields (add more if possible)
export const validationFunctions = {
  checkEmpty: (name = "", value1 = "", value2 = "") =>
    value1.length > 0 || `${errorLabels[name]} field is required`,

  checkPasswordLength: (name = "", value1 = "", value2 = "") =>
    value1.length >= 8 ||
    value1.length === 0 ||
    `${errorLabels[name]} should be no less than 8 characters in length`,

  checkPasswordMatch: (name = "", value1 = "", value2 = "") =>
    value1 === value2 || value1.length === 0 || "The password does not match",

  checkValidEmail: (name = "", value1 = "", value2 = "") => {
    const regex = patterns[name];

    return regex.test(value1) || value1.length === 0 ? true : "Invalid email";
  },
  checkboxRequired: (name="", value1=false, value2="") =>{
    return value1 || "This is required."
  }
};

// an object containing input fields (keys)
// and their associated validation funciton (values as an array)
export const formValidation = {
  username: [validationFunctions.checkEmpty],
  fname: [validationFunctions.checkEmpty],
  lname: [validationFunctions.checkEmpty],
  email: [validationFunctions.checkEmpty, validationFunctions.checkValidEmail],
  password: [
    validationFunctions.checkEmpty,
    validationFunctions.checkPasswordLength,
  ],
  oldPassword: [
    validationFunctions.checkEmpty,
    validationFunctions.checkPasswordLength,
  ],
  newPassword: [
    validationFunctions.checkEmpty,
    validationFunctions.checkPasswordLength,
  ],
  confirmPassword: [
    validationFunctions.checkEmpty,
    validationFunctions.checkPasswordMatch,
  ],
  confirmNewPassword: [
    validationFunctions.checkEmpty,
    validationFunctions.checkPasswordMatch,
  ],
  confirmNewPasswordCheckbox: [
    validationFunctions.checkboxRequired
  ]
};
