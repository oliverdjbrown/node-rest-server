const { response } = require("express");
const { comparePassword } = require('../helpers/hash-password');
const { generateJWT } = require('../helpers/generate-JWT');

const User = require("../models/user.model");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  const invalidUserMessage = { message: "user or password is invalid" };

  try {
    const user = await User.findOne({ email });
    
    // check if email exist    
    if (!user) return res.status(400).json(invalidUserMessage);

    //check if user status is active
    if(!user.state) return res.status(400).json(invalidUserMessage);

    //check password    
    if(!comparePassword(password, user.password)) return res.status(400).json(invalidUserMessage);

    //generate JWT
    const token = await generateJWT(user.id);

    res.status(200).json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "contact the administrator",
    });
  }
};

module.exports = {
  login,
};
