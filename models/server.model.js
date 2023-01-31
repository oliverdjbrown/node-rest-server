const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config.db");
const path = require("../const/url/api_url");
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
    this.app.use(path.auth, require('../routes/auth.routes'));
    this.app.use(path.search, require('../routes/search.routes'));
    this.app.use(path.categories, require('../routes/categories.routes'));
    this.app.use(path.products, require('../routes/products.routes'));
    this.app.use(path.users, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App running in port", this.port);
    });
  }
}

module.exports = Server;
