export const handleRequest = async (url: string, method: string, data?: {}) => {
    try {
        const dataRes = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const res = await dataRes.json();
        return res;
    }
    catch (error) {
        console.log(error, "error");
    };
};

export const METHODS = Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT"
});