class ReqresApi {
    static path = "https://reqres.in/api/";
    static resource = "unknown";

    static async getResource(page = 1, per_page = 10) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        url.searchParams.append("page", page);
        url.searchParams.append("per_page", per_page);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    static async createResource({
        name = "test",
        year = "2023",
        color = "#000000",
        pantone_value = "06-2023",
    } = {}) {
        console.log(name);
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                name,
                year,
                color,
                pantone_value,
            }),
        });
        const answer = await response.json();
        return answer;
    }
}

export default ReqresApi;
