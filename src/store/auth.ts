import { DataUser } from "@/types/frontend/auth/user";
import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { getExpiresDate } from "@/lib/token";

interface UseIsLogin {
  userAccess: string | null;
  setUserAcces: (param: string) => void;
  removeUserAccess: () => void;
}

// type MyPersist = (
//   config: StateCreator<UseIsLogin>,
//   options: PersistOptions<UseIsLogin>
// ) => StateCreator<UseIsLogin>;

// export const loginStore = create<UseIsLogin>(
//   (persist as MyPersist)(
//     (set) => ({
//       userAccess: "",
//       setUserAcces: (param) => set({ userAccess: param }),
//     }),
//     {
//       name: "$userLogin",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export const loginStore = create<UseIsLogin>((set) => ({
  userAccess: Cookies.get("user_access") || null,
  setUserAcces: (token: string) => {
    set({ userAccess: token });
    Cookies.set("user_access", token, {
      expires: getExpiresDate(),
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
  },
  removeUserAccess: () => {
    set({ userAccess: null });
    Cookies.remove("user_access");
  },
}));
