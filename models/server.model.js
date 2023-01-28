const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config.db");
const defaultPort = '3000';

class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT || defaultPort;

    //Database
    this.connectDB();
    
    //MiddleWares
    this.middleWares();

    //App Routes
    this.routes();
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
  }

  routes() {
    this.app.use('/api/users', require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App running in port", this.port);
    });
  }
}

module.exports = Server;
