import {
  TypeUserLogin,
  TypeUserPut,
  TypeUserSignUp,
} from "@/types/backend/auth/user";
import { DataUser } from "@/types/frontend/auth/user";
const url = process.env.NEXT_PUBLIC_BE_URL;

export async function fetchPost(
  data: TypeUserSignUp | TypeUserLogin,
  auth: string
) {
  try {
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

export async function fetchPut(
  data: TypeUserPut,
  id: string,
  jwtToken: string
) {
  try {
    const response = await fetch(url + `/users?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return {
      status: "failed",
      statusCode: 500,
      message: error || "Internal server error!",
    };
  }
}
