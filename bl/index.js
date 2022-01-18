const db = require('../services/db');
const socketService = require('../services/socket');

class BL {
    getItems() {
        return db.getAll();
    }

    insetItem(url, videoId) {
        const { id } = db.insert(url, videoId);
        socketService.broadcastNewItemEvent(id, url, videoId);

        return { id, url, videoId };
    }

    deleteItem(id) {
        db.delete(id);
        socketService.broadcastDeleteItemEvent(id);
    }
}

module.exports = new BL();