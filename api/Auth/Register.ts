const apiUrl = process.env.EXPO_PUBLIC_BACKEND_API;

export default async function RegisterUser(email: string, password: string, role: string,) {
    const response = await fetch(`${apiUrl}/api/v1/user`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            role
        }),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}