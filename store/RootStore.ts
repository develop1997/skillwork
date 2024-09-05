import { create } from "zustand";

export const useRootStore = create((set) => ({
    theme: "light",
}))
