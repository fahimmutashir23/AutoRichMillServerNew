const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const expenseSchema = require("../../Schemas/Expense/expense");
const Expense = new mongoose.model("Expense", expenseSchema);

router.get("/get-expense-list", loginCheck, async (req, res) => {});

router.post("/create-expense",  async (req, res) => {
  const newExpense = new Expense(req.body);
  try {
    const result = Expense.save(newExpense);
    res.json({
      id: result.id,
      message: "Expense Create Successfully",
      status_code: 200,
    });
  } catch (error) {
    res.json(error)
  }
});

module.exports = router