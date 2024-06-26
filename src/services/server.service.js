const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const expressListEndpoints = require("express-list-endpoints");
const { dbConnection } = require("../../config");
const { socketController } = require("../sockets");
const { api } = require("../../constants");

const defaultPort = 3000;

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || defaultPort;
    this.io = require("socket.io")(this.server);

    //Database
    this.connectDB();
    //MiddleWares
    this.middleWares();
    //App Routes
    this.routes();
    //Sockets
    this.sockets();
  }

  async connectDB() {
    await dbConnection();
  }

  middleWares() {
    //Cors
    this.app.use(cors());
    //Read and Body Parse
    this.app.use(express.json());
    //Public Directory
    this.app.use(express.static("public"));
    //FileUpload
    this.fileUpload();
  }

  routes() {
    this.app.use(api, require('../routes'));
    console.log('Endpoints List:', expressListEndpoints(this.app))
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  fileUpload() {
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App running in port", this.port);
    });
  }
}

module.exports = Server;
