import {
  TypeUserLogin,
  TypeUserPut,
  TypeUserSignUp,
} from "@/types/backend/auth/user";
import { ProductsData } from "@/types/backend/user/userType";

let url = "http://localhost:3000/api";

if (process.env.NODE_ENV !== "development") {
  url = "https://laptopzone-six.vercel.app/api";
}

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
        Authorization: `Bearer ${jwtToken}`,
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

export async function fetchPostProductsTable(
  data: ProductsData,
  id: string,
  token: string
) {
  try {
    const response = await fetch(url + `/users?id=${id}&seller=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
