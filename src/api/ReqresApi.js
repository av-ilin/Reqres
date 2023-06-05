class ReqresApi {
    static path = "https://reqres.in/api/";
    static resource = "unknown";

    static async getResource(page = 1, per_page = 10) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        url.searchParams.append("page", page);
        url.searchParams.append("per_page", per_page);
        const response = await fetch(url);
        const data = response.json();
        return data;
    }
}

export default ReqresApi;
