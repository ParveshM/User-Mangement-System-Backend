import { nameRegex, emailRegex } from "../constants/index";

const validateSignUp = (values) => {
  const { name, email, password, rePassword } = values;
  const errors = {};

  //   Name validate
  if (!name.trim().length) {
    errors.name = "Required*";
  } else if (name.length > 15) {
    errors.name = "Must be 15 characters or less.";
  } else if (!nameRegex.test(name)) {
    errors.name = "First letter must be capital.";
  }
  //   email validate
  if (!email.trim().length) {
    errors.email = "Required*";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }
  // password validate
  if (!password.trim().length) {
    errors.password = "Required*";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = "Password must contain uppercase and lowercase letters.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  //   RePassword validate
  if (!rePassword.trim().length) {
    errors.rePassword = "Required*";
  } else if (rePassword.length !== password.length || rePassword !== password) {
    errors.rePassword = "Password is not matching";
  }

  return errors;
};
export { validateSignUp };
