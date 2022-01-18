class RequestService {
    getRequestUrl() {
        return process.env.REACT_APP_BACK_END_URL;
    }

    async getList() {
        const url = `${this.getRequestUrl()}/getAll`
        return fetch(url)
            .then((res) => res.json());
    }

    async insertItem(item) {
        try {
            const url = `${this.getRequestUrl()}/insertItem`;
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: item.url, videoId: item.videoId }),
            };

            return fetch(url, options)
                .then((res) => res.json());
        } catch (ex) {
            console.error(`Could not update list`);
            throw ex;
        }
    }

    async deleteItem(id) {
        try {
            const url = `${this.getRequestUrl()}/deleteItem`;
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            };

            return fetch(url, options)
                .then((res) => res.json());
        } catch (ex) {
            console.error(`Could not delete item`);
            throw ex;
        }
    }
}

export default new RequestService();

