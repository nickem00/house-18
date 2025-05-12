const baseAPIurl = import.meta.env.VITE_API_BASE_URL;

export async function fetchUserInfo() {
    const token = localStorage.getItem("token");

    if (!token) {
        return { error: "User is not logged in" };
    }

    try {
        const res = await fetch(`${baseAPIurl}/api/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.message || "Failed to fetch user information" };
        }

        const userData = await res.json();
        return { user: userData };
    } catch (error) {
        console.error("Error fetching user info:", error);
        return { error: "Network error while fetching user information" };
    }
}