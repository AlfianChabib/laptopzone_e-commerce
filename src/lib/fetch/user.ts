import {
  TypeUserLogin,
  TypeUserPut,
  TypeUserSignUp,
} from "@/types/backend/auth/user";
import { ProductsData } from "@/types/backend/user/userType";

type Url = string | undefined;
let url: Url = "http://localhost:3000/api";
let apiUrl: Url = process.env.NEXT_PUBLIC_BE_URL;
if (process.env.NODE_ENV !== "development") {
  url = apiUrl;
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
    return response.data;
  } catch (error) {
    throw new Error("Failed POST data, server error");
  }
}

export async function dataUser(id: string | undefined) {
  try {
    const dataUser = await fetch(url + `/users?id=${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
    return dataUser.data;
  } catch (error) {
    throw new Error("Failed get User data, internal server Error!");
  }
}

export async function sessionData(id: string | undefined) {
  try {
    const sessionUser = await fetch(url + `/users?id=${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
    return sessionUser.data;
  } catch (error) {
    throw new Error("Failed get Session data, internal server Error!");
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

export async function fetcPostCartTable(data: {
  token: string;
  qty: number;
  productId: number;
  userId: number;
}) {
  try {
    const response = await fetch(
      url + `/cart?productId=${data.productId}&userId=${data.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(data.qty),
      }
    );

    return await response.json();
  } catch (error) {
    return {
      status: "failed",
      statusCode: 500,
      message: error || "Internal server error!",
    };
  }
}
