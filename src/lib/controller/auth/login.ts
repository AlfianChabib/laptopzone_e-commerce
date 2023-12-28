import { prisma } from "@/lib/prisma/client";
import { TypeUserLogin } from "@/types/backend/auth/user";
import validator from "validator";
import { comparePass } from "../password";
export function checkDataLogin(data: TypeUserLogin) {
  let validateEmail = validator.isEmail(data.email);
  if (!validateEmail) return { message: "Please fill email properly" };
  else {
    const userNameEmail = data.email.split("@")[0];
    validateEmail = validator.isAlphanumeric(userNameEmail);
    if (!validateEmail)
      return { message: "Usernames email cannot have special characters" };
  }

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

  return { message: "Success" };
}

export async function LoginUser(data: TypeUserLogin) {
  try {
    const isRegistered = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!isRegistered) {
      return {
        message: "Unregistered Email",
        data: {},
        status: "failed",
        statusCode: 400,
      };
    }

    const isCorrectPassword = await comparePass(
      data.password,
      isRegistered.password
    );

    if (isCorrectPassword.status !== "success") {
      return {
        status: isCorrectPassword.status,
        message: isCorrectPassword.message,
        statusCode: 400,
        data: {},
      };
    }
    
    return {
      message: "success login",
      data: isRegistered,
      status: "success",
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      message: "Oops Server Error",
      data: {},
      status: "failed",
      statusCode: 500,
    };
  } finally {
    await prisma.$disconnect();
  }
}
