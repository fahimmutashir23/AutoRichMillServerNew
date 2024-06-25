const jwt = require("jsonwebtoken");
const User = require('../Schemas/User/userSchema');
const Role = require("../Schemas/Role/role");

const permissionsCheck = (req, res, next) => {
    const tokenWBearer = req.header("Authorization");
    const token = tokenWBearer?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "unauthorize access token" });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "unauthorize access" });
      } 
    const user = await User.findOne({email: decoded.email})
    if(!user){
       return res.json({message: "User not found"})
    }
    const permission = await Role.findOne({roleName: user.role})
    if(!permission){
        return res.json({message: "Role not fount"})
    }
    req.body.permit = permission.roleGroup
    next();
    });
  };

  module.exports = permissionsCheck;