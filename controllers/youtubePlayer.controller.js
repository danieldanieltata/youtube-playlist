const bl = require('../bl/index');
const logger = require('../services/logger');
const statusCode = require('../constants/statusCode.constant');


class YoutubePlayerController {
    getAll(req, res) {
        try {
            const items = bl.getItems();
            res.status(statusCode.OK).send(items);
        } catch (ex) {
            logger.error(`YoutubePlayerController >> Could not get all items, ex: ${ex.message}`);
            res.status(statusCode.SERVER_ERROR).send({ ...ex });
        }
    }

    insertItem(req, res) {
        try {
            const { url, videoId } = req.body;

            const { id } = bl.insetItem(url, videoId);
            res.status(statusCode.OK).send({ id, url, videoId });
        } catch (ex) {
            logger.error(`YoutubePlayerController >> Could not insert new item, ex: ${ex.message}`);
            res.status(statusCode.SERVER_ERROR).send({ ...ex });
        }
    }

    deleteItem(req, res) {
        try {
            const { id } = req.body;

            bl.deleteItem(id);
            res.status(statusCode.OK).send({ id });
        } catch (ex) {
            logger.error(`YoutubePlayerController >> Could not delete item, ex: ${ex.message}`);
            res.status(statusCode.SERVER_ERROR).send({...ex});
        }
    }
}

module.exports = new YoutubePlayerController();
