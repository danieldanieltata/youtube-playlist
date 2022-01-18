const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');


const logger = require('./services/logger');
const youtubePlayerRouter = require('./routes/youtubePlayer.router');

const app = express();
const server = http.createServer(app);
const PORT = process.env.port || 8080;

require('./services/socket').initSocket(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', youtubePlayerRouter.router);

app.use(express.static(path.resolve(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});

//TODO: tests.

server.listen(PORT, () => {
    logger.info(`Youtube player backend has started successfully on port ${PORT}`);
});