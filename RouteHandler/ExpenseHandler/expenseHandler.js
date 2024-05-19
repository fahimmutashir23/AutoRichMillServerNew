const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Expense = require('../../Schemas/Expense/expense');

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

router.get("/update-expense", loginCheck, async (req, res) => {});

router.get("/delete-expense", loginCheck, async (req, res) => {});



module.exports = router