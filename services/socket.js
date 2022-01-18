const logger = require('./logger');

class SocketService {
    #io;

    initSocket(server) {
        this.#io = require('socket.io')(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });

        this.#io.on('connection', (socket) => {
            logger.info(`SocketService >> New connection with id: ${socket.id}`);

            socket.on('disconnect', () => {
                logger.info(`SocketService >> Socket ${socket.id} has disconnected`);
            });
        });
    }

    broadcastNewItemEvent(id, url, videoId) {
        try {
            this.#io.emit('new-item', { id, url, videoId });
        } catch (ex) {
            logger.error(`SocketService >> Could not broadcast new item event, ex: ${ex.message}`);
            throw ex;
        }
    }

    broadcastDeleteItemEvent(id) {
        try {
            this.#io.emit('delete-item', { id });
        } catch (ex) {
            logger.error(`SocketService >> Could not broadcast delete event, ex: ${ex.message}`);
            throw ex;
        }
    }
}

module.exports = new SocketService();
