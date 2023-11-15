const { response } = require("express");
const { comparePassword } = require('../helpers/hash-password');
const { generateJWT } = require('../helpers/generate-JWT');
const { googleVerify } = require("../helpers/google-verify");

const User = require("../models/user.model");
const { contactAdmin,status50X, invalidUserOrPassword, invalidUser } = require("../const/messages");

const login = async (req, res = response) => {
  const { email, password } = req.body;  

  try {
    const user = await User.findOne({ email });
    
    // check if email exist    
    if (!user) return res.status(400).json(invalidUserOrPassword);

    //check if user status is active
    if(!user.state) return res.status(400).json(invalidUserOrPassword);

    //check password    
    if(!comparePassword(password, user.password)) return res.status(400).json(invalidUserOrPassword);

    //generate JWT
    const token = await generateJWT(user._id.toString());

    res.status(200).json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(status50X);
  }
};

const googleSignIn = async(req, res = response)=> {
  const { id_token } = req.body;

  try {
   const {name, img, email } = await googleVerify(id_token);

   //check if user exist
   let user = await User.findOne({email});

   //create user
   if(!user) {
    const data = {
      name,
      email,
      password: '',
      img,
      google: true
    };
    user = new User(data);
    await user.save();
   }

   //check user state
   if(!user.state) return res.status(401).json(contactAdmin);

   //generate JWT
   const token = await generateJWT(user.id);
    
    res.json({
      user,
      token
    });

  } catch (error) {
    res.status(400).json(invalidUser);
  }
}

const renewJWT = async(req, res = response) => {
  const { user } = req;  
  const token = await generateJWT(user?.id);
  res.status(200).json({
    user,
    token
})
}

module.exports = {
  login,
  googleSignIn,
  renewJWT
};
