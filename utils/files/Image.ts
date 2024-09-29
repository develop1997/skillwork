import { readAsStringAsync } from "expo-file-system";
import { Buffer } from "buffer";

export async function uriToBuffer(uri: string) {
	const base64 = await readAsStringAsync(uri, { encoding: "base64" });
	return base64ToBuffer(base64);
}

function base64ToBuffer(base64: string): Buffer {
	const binaryString = atob(base64);
	const byteArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));
	return Buffer.from(byteArray);
}

