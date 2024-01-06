import Navbar from "@/components/main-nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { Session } from "next-auth";

const getUserData = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  let { id } = session as Session & { id: string | null };
  const response = await fetch(`http://localhost:3000/api/users?id=${id}`).then(
    (response) => response.json()
  );
  return response.data;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  let userData;
  if (session) {
    userData = await getUserData();
  }

  return (
    <section className="flex flex-col w-full h-[1000px]">
      <Navbar dataUser={userData} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl">Wellcome {userData?.name}</h1>
      </div>
    </section>
  );
}
