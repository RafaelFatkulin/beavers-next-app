type ApiOptions<B> = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers?: Record<string, string>;
    body?: B
}

async function api<T, B = undefined>({
    url,
    method = "GET",
    headers = {},
    body
}: ApiOptions<B>): Promise<T> {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined
        })

        if(!response.ok) {
            const errorData = await response.json(); // Parse the error response
            console.log("🚨🚨🚨🚨 ~ error data:", errorData); // Log error details

            throw new Error(
                errorData?.message || errorData?.error?.message || response.statusText
            ); // Throw the error with a message

        }
    } catch (error) {
        console.error("Error in restRequest:", error); // Log any errors that occur during the request
        throw error; // Rethrow the error to be handled by the caller
    }
}