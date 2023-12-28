import bcrypt from "bcrypt";

const saltRounds = 10;
export async function encryptPass(pass: string) {
  try {
    const passEncrpyt = await bcrypt.hash(pass, saltRounds);
    return {
      status: "Success",
      password: passEncrpyt,
      message: "Success encrypsi password",
    };
  } catch (error: any) {
    return {
      status: "failed",
      message: error || "failed when encrypt password",
      password: "",
    };
  }
}

export async function comparePass(password: string, hashPass: string) {
  try {
    const isPassCorrect = await bcrypt.compare(password, hashPass);
    if (!isPassCorrect) {
      return { status: "failed", message: "Wrong password" };
    }

    return { status: "success", message: "Correct Password" };
  } catch (error) {
    return {
      status: "failed",
      message: error || "failed when compare password",
    };
  }
}
