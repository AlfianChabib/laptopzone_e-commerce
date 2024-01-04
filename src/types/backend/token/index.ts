export type ParamToken = {
  userName?: string;
  email?: string;
  id?: number | null;
};

export type DataDecode = {
  userName: string;
  email: string;
  iat: number;
  exp: number;
  id: number;
};
