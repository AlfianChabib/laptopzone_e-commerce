import { ParamToken } from "@/types/backend/token";
import jwt from "jsonwebtoken";

const secretToken =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET || "secret123token";

export function setAccessToken(payload: ParamToken) {
  const { userName, email, id } = payload;
  const accessToken = jwt.sign({ userName, email, id }, secretToken, {
    expiresIn: "7d",
  });

  return accessToken;
}

const refreshToken =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET || "refresh123token";

export function setRefreshToken(payload: ParamToken) {
  const { userName, email, id } = payload;

  const refresh = jwt.sign({ userName, email, id }, refreshToken, {
    expiresIn: "1m",
  });

  return refresh;
}

export function getExpiresDate() {
  const currentDate = new Date();
  const sevenDaysLater = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  return sevenDaysLater;
}
