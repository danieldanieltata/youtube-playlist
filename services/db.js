const logger = require('../services/logger');

class DbService {
    #db;
    #incrementalId = 1;

    constructor() {
        this.#db = [];
    }

    getAll() {
        try {
            return this.#db;
        } catch (ex) {
            logger.error(`DbService >> Could not get all items, ex: ${ex.message}`);
            throw ex;
        }
    }

    insert(url, videoId) {
        try {
            const data = { id: this.#incrementalId, url, videoId };

            this.#db.push(data);
            this.#incrementalId += 1;

            return data;
        } catch (ex) {
            logger.error(`DbService >> Could not insert new item, ex: ${ex.message}`);
            throw ex;
        }
    }

    delete(id) {
        try {
            this.#db = this.#db.filter((item) => item.id !== id);
        } catch (ex) {
            logger.error(`DbService >> Could not delete item, ex: ${ex.message}`);
            throw ex;
        }
    }
}

module.exports = new DbService();
