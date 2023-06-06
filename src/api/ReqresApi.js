class ReqresApi {
    static path = "https://reqres.in/api/";
    static resource = "unknown";
    static alerts = true;

    static FYI(message) {
        console.log(message);
        if (this.alerts) alert(message);
    }

    static async getResource(page = 1, per_page = 10) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        url.searchParams.append("page", page);
        url.searchParams.append("per_page", per_page);

        let answer;
        try {
            const start = Date.now();
            const response = await fetch(url);
            answer = await response.json();
            const end = Date.now();
            this.FYI(`Данные получены за ${(end - start) / 1000} сек.`);
        } catch (err) {
            answer = undefined;
            this.FYI(`Ошибка получения данных: ${err}`);
        }
        return answer;
    }

    static async createResource({
        name = "test",
        year = "2023",
        color = "#000000",
        pantone_value = "06-2023",
    } = {}) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        let answer;
        try {
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify({
                    name,
                    year,
                    color,
                    pantone_value,
                }),
            });
            answer = await response.json();
            this.FYI(`Данные сохранены. ID: ${answer.id}`);
        } catch (err) {
            answer = undefined;
            this.FYI(`Ошибка сохранения данных: ${err}`);
        }
        return answer;
    }
}

export default ReqresApi;
