import { TypeUserLogin, TypeUserSignUp } from "@/types/backend/auth/user";

export async function fetchPost(
  data: TypeUserSignUp | TypeUserLogin,
  auth: string
) {
  try {
    const url = process.env.NEXT_PUBLIC_BE_URL;
    const dataUser = await fetch(url + `/auth/${auth}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await dataUser.json();
    return response;
  } catch (error) {
    throw new Error("Failed signup, server error");
  }
}
