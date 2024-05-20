const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Client = require("../../Schemas/Client/client");

router.get("/get-client-list", loginCheck, async (req, res) => {
  try {
    const result = await Client.find();
    //send response
    res.status(200).json({
      success: true,
      message: "client get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-client", loginCheck, async (req, res) => {
  const newClient = new Client(req.body);
  console.log(newClient);
  try {
    const result = newClient.save();
    res.status(200).json({
      success: true,
      message: "client post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update
router.patch("/update-client/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Client.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: "client not found" });
    }
    res.json({
      status_code: 200,
      message: "Client Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-client/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Client.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({
      status_code: 200,
      message: "Client Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
