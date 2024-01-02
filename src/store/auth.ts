import { DataUser } from "@/types/frontend/auth/user";
import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

interface UseIsLogin {
  userAccess: string;
  setUserAcces: (param: string) => void;
}

type MyPersist = (
  config: StateCreator<UseIsLogin>,
  options: PersistOptions<UseIsLogin>
) => StateCreator<UseIsLogin>;

export const loginStore = create<UseIsLogin>(
  (persist as MyPersist)(
    (set) => ({
      userAccess: "",
      setUserAcces: (param) => set({ userAccess: param }),
    }),
    {
      name: "$userLogin",
      storage: createJSONStorage(() => localStorage),
    }
  )
);