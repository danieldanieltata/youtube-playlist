const router = require('express').Router();

const youtubePlayerController = require('../controllers/youtubePlayer.controller');

class YoutbuePlayerRouter {
    constructor() {
        this.router = router;

        this.router.get('/', (req, res) => { res.status(200).send('Youtube player backend is runnig!'); } );
        this.router.get('/getAll', youtubePlayerController.getAll);
        this.router.post('/insertItem', youtubePlayerController.insertItem);
        this.router.delete('/deleteItem', youtubePlayerController.deleteItem);
    }
}

module.exports = new YoutbuePlayerRouter();
