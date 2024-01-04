import Navbar from "@/components/main-nav";
import { fetchGet } from "@/lib/fetch/user";
import { JwtPayload, decode } from "jsonwebtoken";
import { cookies } from "next/headers";

const getUserData = async () => {
  const token = cookies().get("user_access")?.value;
  const decoded = decode(token as string);
  const { id } = decoded as JwtPayload;
  const response = await fetchGet(id).catch((error) => {
    throw new Error(error);
  });
  return response.data;
};

export default async function Home() {
  const dataUser = await getUserData();

  return (
    <section className="flex flex-col w-full h-[1000px]">
      <Navbar dataUser={dataUser} />
    </section>
  );
}
