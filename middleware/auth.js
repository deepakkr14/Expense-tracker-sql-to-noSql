const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const secretKey = "secretkey";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
  
    const user = jwt.verify(token, secretKey);
    await User.findById(user.userId).then((user) => {
      
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false,status:401 });
  }
};

module.exports = authenticate;
