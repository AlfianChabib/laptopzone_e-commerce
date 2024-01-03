import { cookies } from "next/headers";
import { decode, JwtPayload } from "jsonwebtoken";
import { fetchGet } from "@/lib/fetch/user";

export const getUser = async () => {
  const user: string | undefined = cookies().get("user_access")?.value;
  const decoded = decode(user as string);
  const { id } = decoded as JwtPayload;
  const response = await fetchGet(id);
  return response;
};

export default async function Home() {
  const userSession = await getUser();
  console.log(userSession);

  return <section className="flex flex-col w-full h-[1000px]"></section>;
}
