export interface AuthResponse {
  status: string;
  statusCode: number;
  message: string;
  data?: SessionData;
  accessToken: string;
}

export interface SessionData {
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
