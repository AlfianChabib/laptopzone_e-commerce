export interface AuthResponse {
  status: string;
  statusCode: number;
  message: string;
  data?: DataUser;
  accessToken: string;
}

export interface DataUser {
  id?: number;
  name?: string;
  userName?: string;
  refreshToken?: string;
  email?: string;
  password?: string;
  address?: string | null;
  telp?: string | null;
  picture?: string | null | undefined;
}
