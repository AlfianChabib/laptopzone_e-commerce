import Navbar from "@/components/main-nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { Session } from "next-auth";
import { sessionData } from "@/lib/fetch/user";

// const getUserData = async () => {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return null;
//   }
//   let { id } = session as Session & { id: string | null };
//   const response = await fetch(`http://localhost:3000/api/users?id=${id}`)
//     .then((response) => response.json())
//     .then((data) => data)
//     .catch((error) => console.log(error));
//   return response.data;
// };

const getUserdata = async (session: Session) => {
  if (!session) {
    return null;
  }
  let { id } = session as Session & { id: string | undefined };
  const response = await sessionData(id);
  return response;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  let sessionData;
  if (session) {
    sessionData = await getUserdata(session);
  }

  return (
    <section className="flex flex-col w-full h-full">
      <Navbar sessionData={sessionData} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl">Wellcome {sessionData?.name}</h1>
      </div>
    </section>
  );
}
