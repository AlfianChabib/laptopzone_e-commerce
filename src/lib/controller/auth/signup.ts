import { prisma } from "@/lib/prisma/client";
import { TypeUserSignUp } from "@/types/backend/auth/user";
import validator from "validator";

export function responseFailed(message: string) {
  return {
    status: "failed",
    statusCode: 400,
    message: message,
  };
}
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

export async function checkUsername(userName: string) {
  try {
    const user = await prisma.user.findFirst({ where: { userName } });
    if (user) {
      const err = new Error("Username already registered");
      throw err;
    }

    return { message: "Success" };
  } catch (error: any) {
    return { message: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function checkEmail(email: string) {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      const err = new Error("Email already registered");
      throw err;
    }

    return { message: "Success" };
  } catch (error: any) {
    return { message: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function addNewUser(dataUser: TypeUserSignUp) {
  try {
    const response = await prisma.user.create({
      data: {
        name: dataUser.name,
        userName: dataUser.userName,
        email: dataUser.email,
        password: dataUser.password,
        address: dataUser.address,
        picture: dataUser.picture,
        telp: dataUser.telp,
        refreshToken: "",
      },
    });

    return { status: "success", response, message: "success add new user" };
  } catch (error) {
    return { status: "failed", message: "Something when wrong!" };
  } finally {
    await prisma.$disconnect();
  }
}
