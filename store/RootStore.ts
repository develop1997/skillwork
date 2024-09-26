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
    user_role?: number
    setUser_role: (user_role: number | undefined) => void
}

export class RootatoreKeys {
    static readonly THEME = "theme"
    static readonly SESION_TOKEN = "sesion_token"
    static readonly USER_ROLE = "user_role"
}

export const useRootStore = create<RootStoreType>((set) => ({
    user_role: undefined,
    setUser_role: (user_role: number | undefined) => set((state: RootStoreType) => ({ ...state, user_role })),
}))

