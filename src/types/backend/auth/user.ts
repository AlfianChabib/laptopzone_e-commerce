import { DataUser } from "@/types/frontend/auth/user";

export interface TypeUserSignUp {
  name: string;
  userName: string;
  email: string;
  password: string;
  address: string;
  telp: string;
  picture: string;
  refreshToken?: string;
  products?: string[] | "";
  carts?: string[] | "";
  wishlists?: string[] | "";
  transactions?: string[] | "";
  seller?: string[] | "";
}

export interface TypeUserLogin {
  email: string;
  password: string;
}

export type FuncLoginUser = {
  status: string;
  message: string | {};
  statusCode: number;
  data: DataUser;
};

export type TypeUserPut = {
  name: string;
  userName: string;
  address: string;
  telp: string;
  picture: string;
};
