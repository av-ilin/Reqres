class ReqresApi {
    static path = "https://reqres.in/api";
    static resource = "/unknown";
    static login = "/login";
    static alerts = false;
    static delay = { active: true, duration: 0.5 };

    static FYI(message) {
        console.log(message);
        if (this.alerts) alert(message);
    }

    static async getResource(page = 1, per_page = 10) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);
        url.searchParams.append("page", page);
        url.searchParams.append("per_page", per_page);

        let answer, message;
        try {
            const start = Date.now();
            const response = await fetch(url);
            answer = await response.json();
            const end = Date.now();
            message = `Данные получены за ${(end - start) / 1000} сек.`;
        } catch (err) {
            answer = undefined;
            message = `Ошибка получения данных: ${err}`;
        }
        this.FYI(message);
        return { response: answer, message };
    }

    static async createResource({ name, year, color, pantone_value } = {}) {
        const url = new URL(ReqresApi.path + ReqresApi.resource);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

        let answer, message;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    year,
                    color,
                    pantone_value,
                }),
            });
            answer = await response.json();
            if (!response.ok) throw new Error(answer.error);
            message = `Данные сохранены. ID: ${answer.id}`;
        } catch (err) {
            answer = undefined;
            message = `Ошибка сохранения данных: ${err}`;
        }
        this.FYI(message);
        return { response: answer, message };
    }

    static async updResource(id, { name, year, color, pantone_value } = {}) {
        const url = new URL(ReqresApi.path + ReqresApi.resource + `/${id}`);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

        let answer, message;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    accept: "application/json",
                },
                body: JSON.stringify({
                    name,
                    year,
                    color,
                    pantone_value,
                }),
            });
            if (!response.ok) {
                answer = await response.json();
                throw new Error(answer.error);
            }
            answer = response.status;
            message = `Данные обновлены.`;
        } catch (err) {
            answer = undefined;
            message = `Ошибка обновления данных: ${err}`;
        }
        this.FYI(message);
        return { response: answer, message };
    }

    static async delResource(id) {
        const url = new URL(ReqresApi.path + ReqresApi.resource + `/${id}`);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

        let answer, message;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                },
            });
            if (!response.ok) {
                answer = await response.json();
                throw new Error(answer.error);
            }
            answer = response.status;
            message = `Данные удалены.`;
        } catch (err) {
            answer = undefined;
            message = `Ошибка удаления данных: ${err}`;
        }
        this.FYI(message);
        return { response: answer, message };
    }

    static async signIn({ email, password }) {
        const url = new URL(ReqresApi.path + ReqresApi.login);
        if (this.delay.active)
            url.searchParams.append("delay", this.delay.duration);

        let answer, message;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            answer = await response.json();
            if (!response.ok) throw new Error(answer.error);
            message = `Вход произошел успешно.`;
        } catch (err) {
            answer = undefined;
            message = `Ошибка при входе: ${err.message}`;
        }
        this.FYI(message);
        return { response: answer, message };
    }
}

export default ReqresApi;
