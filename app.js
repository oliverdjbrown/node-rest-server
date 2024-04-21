require('dotenv').config();

const Server = require('./src/services/server.service');

const server = new Server();

server.listen();
