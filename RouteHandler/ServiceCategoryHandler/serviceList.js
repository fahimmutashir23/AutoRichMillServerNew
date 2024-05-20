const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Service = require("../../Schemas/Services/serviceList");
const multer = require("multer");
const path = require("path");
const UPLOAD_FOLDER = "../../images";
//----------------------- Multer -----------------//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
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
router.get("/get-service", async (req, res) => {
  try {
    const result = await Service.find();
    //send response
    res.status(200).json({
      success: true,
      message: "Service Get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-service", upload.single("image"), async (req, res) => {
  const newService = new Service(req.body);
  console.log(newService);
  try {
    const result = newService.save();
    res.status(200).json({
      success: true,
      message: "Service Post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update
router.patch("/update-service/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Service.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({
      status_code: 200,
      message: "Service Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-service/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Service.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({
      status_code: 200,
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
