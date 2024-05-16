const jwt = require("jsonwebtoken");

const loginCheck = (req, res, next) => {
    const tokenWBearer = req.header("Authorization");
    const token = tokenWBearer?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "unauthorize access token" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "unauthorize access" });
      }
      req.email = decoded;
      next();
    });
  };

  module.exports = loginCheck;