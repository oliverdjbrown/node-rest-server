const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config.db");
const { socketController } = require("../sockets/controller");

const path = require("../const/url/api_url");
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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(path.auth, require("../routes/auth.routes"));
    this.app.use(path.search, require("../routes/search.routes"));
    this.app.use(path.categories, require("../routes/categories.routes"));
    this.app.use(path.products, require("../routes/products.routes"));
    this.app.use(path.users, require("../routes/user.routes"));
    this.app.use(path.uploads, require("../routes/uploads.routes"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App running in port", this.port);
    });
  }
}

module.exports = Server;
