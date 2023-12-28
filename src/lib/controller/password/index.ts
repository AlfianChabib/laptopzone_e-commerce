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
