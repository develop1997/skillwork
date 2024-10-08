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
	user_role?: number;
	setUser_role: (user_role: number | undefined) => void;
	userData?: any;
	setUserData: (userData: any) => void;
	userJobs?: any;
	setUserJobs: (userJobs: any) => void;
	applyedJobs?: any;
	setApplyedJobs: (applyedJobs: any) => void;

	// dialogs
	message: { title: string; message: string };
	setMessage: (message: { title: string; message: string }) => void;
	messageVisible: boolean;
	setMessageVisible: (messageVisible: boolean) => void;
	confirmVisible: boolean;
	setConfirmVisible: (confirmVisible: boolean) => void;
}

export class RootatoreKeys {
	static readonly SESION_TOKEN = "sesion_token";
	static readonly USER_ROLE = "user_role";
}

export const useRootStore = create<RootStoreType>((set) => ({
	user_role: undefined,
	setUser_role: (user_role: number | undefined) =>
		set((state: RootStoreType) => ({ ...state, user_role })),
	userData: undefined,
	setUserData: (userData: any) =>
		set((state: RootStoreType) => ({ ...state, userData })),
	userJobs: [],
	setUserJobs: (userJobs: any) =>
		set((state: RootStoreType) => ({ ...state, userJobs })),
	applyedJobs: [],
	setApplyedJobs: (applyedJobs: any) =>
		set((state: RootStoreType) => ({ ...state, applyedJobs })),
	message: { title: "", message: "" },
	setMessage: (message: { title: string; message: string }) =>
		set((state: RootStoreType) => ({ ...state, message })),
	messageVisible: false,
	setMessageVisible: (messageVisible: boolean) =>
		set((state: RootStoreType) => ({ ...state, messageVisible })),
	confirmVisible: false,
	setConfirmVisible: (confirmVisible: boolean) =>
		set((state: RootStoreType) => ({ ...state, confirmVisible })),
}));
