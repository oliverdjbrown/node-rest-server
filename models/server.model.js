const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config.db");
const { socketController } = require("../sockets/controller");

const api = require("../const/url/base_url");
const defaultPort = "3000";

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
    this.app.use(`${api}`, require('../routes'));
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
