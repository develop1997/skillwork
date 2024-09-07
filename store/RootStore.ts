import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

// write
export async function saveToSecureStore(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}
// read
export async function readFromSecureStore(key: string) {
    return await SecureStore.getItemAsync(key);
}

// delete
export async function deleteFromSecureStore(key: string) {
    await SecureStore.deleteItemAsync(key);
}

export interface RootStoreType {
    theme: string
    sesion_token?: string
    setTheme: (theme: string) => void
    setSesion_token: (sesion_token: string | undefined) => void
}

export class RootatoreKeys {
    static readonly THEME = "theme"
    static readonly SESION_TOKEN = "sesion_token"
}

export const useRootStore = create<RootStoreType>((set) => ({
    theme: "light",
    sesion_token: undefined,
    setTheme: (theme: string) => set((state: RootStoreType) => ({ ...state, theme })),
    setSesion_token: (sesion_token: string | undefined) => set((state: RootStoreType) => ({ ...state, sesion_token })),
}))

