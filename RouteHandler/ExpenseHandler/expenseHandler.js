const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Expense = require("../../Schemas/Expense/expense");

router.get("/get-expense-list", loginCheck, async (req, res) => {
  try {
    const result = await Expense.find();
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-expense", loginCheck, async (req, res) => {
  const newExpense = new Expense(req.body);
  try {
    const result = Expense.save(newExpense);
    res.json({
      id: result.id,
      message: "Expense Create Successfully",
      status_code: 200,
    });
  } catch (error) {
    res.json(error);
  }
});

//update
router.patch("/update-expense/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Expense.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({
      status_code: 200,
      message: "Expense Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-expense/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Expense.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({
      status_code: 200,
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
