const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('Database connection works!!!');
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to connect database");
  }
};

module.exports = {
  dbConnection,
};
