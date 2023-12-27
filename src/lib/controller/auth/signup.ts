import { TypeUserSignUp } from "@/types/backend/auth/user";
import validator from "validator";

export function checkData(data: TypeUserSignUp) {
  // validasi name
  let validateName: boolean = validator.isLength(data.name, { min: 5 });
  if (!validateName) return { message: "Minimum of characters name is 5" };

  //   Validasi USername
  let validateUserName: boolean = validator.isAlphanumeric(data.userName);
  if (!validateUserName)
    return { message: "Usernames cannot have special characters" };
  else {
    validateUserName = validator.isLength(data.userName, { min: 6 });
    if (!validateUserName)
      return { message: "Minimum of characters username is 6" };
  }

  //   Validasi email
  let validateEmail = validator.isEmail(data.email);
  if (!validateEmail) return { message: "Please fill email properly" };
  else {
    const userNameEmail = data.email.split("@")[0];
    validateEmail = validator.isAlphanumeric(userNameEmail);
    if (!validateEmail)
      return { message: "Usernames email cannot have special characters" };
  }

  //   Validasi password
  let validatePassword = validator.isStrongPassword(data.password, {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
  if (!validatePassword)
    return {
      message:
        "Minimum characters of password is 8, minimum of uppercase is 1, and minimum of number is 1",
    };

  // validasi notelp
  if (data.telp !== "") {
    let validateNoTelp = validator.isMobilePhone(data.telp, "id-ID");

    if (!validateNoTelp)
      return { message: "Please fill number telpon properly" };
  }

  return { message: "Success" };
}
