import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  bears: number;
  setBears: (bears: number) => void;
}

interface StorePersist {
  bears: number;
  setBears: (bears: number) => void;
}

export const useStore = create<Store>((set) => ({
  bears: 0,
  setBears: (bears: number) => set({ bears }),
}));

export const useStorePersist = create<StorePersist>()(
  persist(
    (set) => ({
      bears: 0,
      setBears: (bears: number) => set({ bears }),
    }),
    { name: "zustand" }
  )
);
