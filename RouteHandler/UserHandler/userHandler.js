const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const User = require('../../Schemas/User/userSchema');

const createJwtToken = (email) => {
  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "100h",
  });
  return token;
};

router.get("/get-users", loginCheck,  async (req, res) => {
  const email = req.query.email;
  let user;
  if (email) {
    user = { email: email };
  }
  try {
    const result = await User.find(user);
    res.json({
      ...result,
      message: "Successfully Loaded Data",
      status_code: 200,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-users", async (req, res) => {
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

router.get('/auth', async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(400).json('Invalid username or password');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json('Invalid username or password');
    } else {
      const token = createJwtToken(email);
      return res.status(201).json({
        message: 'Login Successfully',
        user: { email: user.email, name: user.name },
        token,
      });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put("/update-user/:id", loginCheck, async (req, res) => {
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

router.delete("/delete-user/:id", loginCheck, async (req, res) => {
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
