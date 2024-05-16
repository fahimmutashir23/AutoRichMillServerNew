const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../../Model/models");
const loginCheck = require("../../Middleware/checkLogin");

const createJwtToken = (email) => {
  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

router.get("/auth", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  const filter = { email: email };
  const result = await User.findOne(filter);
  if (result) {
    if (result.password == password) {
      const token = createJwtToken(email);
      return res.json({
        status_code: 201,
        message: "Login Successfully",
        user: { email: email, name: result.name },
        token,
      });
    }
    res.json({ message: "failed" });
  }
  res.json({ message: "failed" });
});

router.get("/get-users", loginCheck, async (req, res) => {
  const email = req.query.email;
  let user;
  if (email) {
    user = { email: email };
  }
  try {
    const result = await User.find(user);
    res.json({
      ...result,
      message: "User Create Successfully",
      status_code: 200,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-users", loginCheck, async (req, res) => {
  const newUser = new User(req.body);

  const filter = { email: newUser.email };

  const findMail = await User.findOne(filter);
  if (findMail) {
    return res.json({ message: "email already exist" });
  }
  try {
    const result = await newUser.save();
    res.json({
      id: result.id,
      message: "User Create Successfully",
      status_code: 200,
    });
  } catch (error) {
    res.json(error.message);
  }
});

router.put("/update-user/:id", async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      name: info.name,
      phone: info.phone,
      email: info.email,
      address: info.address || null,
      image: info.image || null,
    },
  };

  try {
    const result = await User.findOneAndUpdate(filter, updateDoc, {
      new: true,
    });
    res.json({
      status_code: 200,
      message: "Successfully Updated",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await User.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "User Delete Successfully"
    });
  } catch (error) {res.json(error)}
});

module.exports = router;
