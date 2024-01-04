import { TypeUserLogin, TypeUserSignUp } from "@/types/backend/auth/user";

let url = process.env.NEXT_PUBLIC_BE_URL || "http://localhost:3000/api";

export async function fetchPost(
  data: TypeUserSignUp | TypeUserLogin,
  auth: string
) {
  try {
    const dataUser = await fetch(url + `/auth/${auth}`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const response = await dataUser.json();
    return response;
  } catch (error) {
    throw new Error("Failed POST data, server error");
  }
}

export async function fetchGet(id?: string) {
  try {
    const param = id ? "?id=" + id : "";
    const dataUser = await fetch(url + `/users${param}`);
    return await dataUser.json();
  } catch (error) {
    throw new Error("Failed get data, internal server Error!");
  }
}
