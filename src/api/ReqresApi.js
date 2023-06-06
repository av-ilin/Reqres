class ReqresApi {
    static path = "https://reqres.in/api/";
    static resource = "unknown";
    static delay = { active: true, length: 3 };

    static async getResource(page = 1, per_page = 10) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.length);
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
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.length);

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
            alert(`Данные сохранены. ID: ${answer.id}`);
        } catch (err) {
            answer = undefined;
            alert(`Ошибка сохранения данных: ${err}`);
        }
        return answer;
    }
}

export default ReqresApi;
