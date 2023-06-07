class ReqresApi {
    static path = "https://reqres.in/api/";
    static resource = "unknown";
    static alerts = false;
    static delay = { active: true, duration: 0.5 };

    static FYI(message) {
        console.log(message);
        if (this.alerts) alert(message);
    }

    static async getResource(page = 1, per_page = 10) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        url.searchParams.append("page", page);
        url.searchParams.append("per_page", per_page);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

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

    static async createResource({ name, year, color, pantone_value } = {}) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

        let answer;
        try {
            const response = await fetch(url, {
                method: "POST",
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

    static async updResource(id, { name, year, color, pantone_value } = {}) {
        const url = new URL(ReqresApi.path + ReqresApi.resource + `/${id}`);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

        let answer;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                body: JSON.stringify({
                    name,
                    year,
                    color,
                    pantone_value,
                }),
            });
            answer = await response.json();
            this.FYI(`Данные обновлены.`);
        } catch (err) {
            answer = undefined;
            this.FYI(`Ошибка обновления данных: ${err}`);
        }
        return answer;
    }

    static async delResource(id) {
        const url = new URL(ReqresApi.path + ReqresApi.resource + `/${id}`);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

        let answer;
        try {
            const response = await fetch(url, {
                method: "DELETE",
            });
            answer = response.status;
            this.FYI(`Данные удалены.`);
        } catch (err) {
            answer = undefined;
            this.FYI(`Ошибка удаления данных: ${err}`);
        }
        return answer;
    }
}

export default ReqresApi;
