const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Provider = require("../../Schemas/Provider/provider");
const multer = require("multer");
const path = require("path");

//----------------------- Multer -----------------//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    if (file) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      console.log("🚀 ~ fileName:", fileName);
      cb(null, fileName + fileExt);
    }
  },
});

var upload = multer({
  storage: storage,
});
//---------------------------------------------//
router.get("/get-provider", async (req, res) => {
  try {
    const result = await Provider.find();
    //send response
    res.status(200).json({
      success: true,
      message: "provider Get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-provider/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Provider.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-provider", upload.any(), async (req, res) => {
  const newProvider = new Provider(req.body);
  console.log(newProvider);
  try {
    const result = newProvider.save();

    res.status(200).json({
      success: true,
      message: "provider Post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update
router.patch("/update-provider/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Provider.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "provider not found" });
    }
    res.json({
      status_code: 200,
      message: "provider Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-provider/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Provider.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "provider not found" });
    }
    res.json({
      status_code: 200,
      message: "provider Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
