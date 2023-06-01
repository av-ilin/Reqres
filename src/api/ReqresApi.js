class ReqresApi {
    static path = "https://reqres.in/api/";
    static resource = "unknown";

    async getResource() {
        const url = ReqresApi.path + ReqresApi.resource;
        const response = await fetch(url);
        const data = response.json();
        return data;
    }
}
