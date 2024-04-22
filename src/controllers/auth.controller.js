const { response } = require("express");
const { comparePassword } = require("../../helpers");
const { generateJWT } = require("../../helpers");
const { googleVerify } = require("../../helpers");

const User = require("../models");
const {
  contactAdmin,  
  invalidUserOrPassword,
  invalidUser,
} = require("../../constants");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json(invalidUserOrPassword);
    
    if (!user.state) return res.status(400).json(invalidUserOrPassword);

    if (!comparePassword(password, user.password))
      return res.status(400).json(invalidUserOrPassword);

    const token = await generateJWT(user.id.toString());

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(status50X);
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: "",
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    if (!user.state) return res.status(401).json(contactAdmin);

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json(invalidUser);
  }
};

const renewJWT = async (req, res = response) => {
  const { user } = req;
  const token = await generateJWT(user?.id);
  res.status(200).json({
    user,
    token,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewJWT,
};
