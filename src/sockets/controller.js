const { Socket } = require("socket.io");
const { validateJWT } = require('../../helpers')

const socketController = async (socket = new Socket(), io) => {
      const token = socket.handshake.headers['jwt'];
      const user = await validateJWT(token);
      if(!user) return socket.disconnect();
      console.log('User Connected', user.name);
};

module.exports = {
  socketController,
};
