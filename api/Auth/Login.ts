const apiUrl = process.env.EXPO_PUBLIC_BACKEND_API;

export default async function Login(email: string, password: string) {
    const response = await fetch(`${apiUrl}/api/v1/user`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}