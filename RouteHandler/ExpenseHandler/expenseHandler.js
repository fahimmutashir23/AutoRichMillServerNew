const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Expense = require('../../Schemas/Expense/expense');
const Category = require('../../Schemas/Category/category');


router.post("/create-expense", loginCheck,  async (req, res) => {
  try {
  const newExpense = req.body;
  const id = newExpense.category
  const filter = {_id: id}
  
    const getCategory = await Category.findOne(filter)

    if (!getCategory) {
      return res.status(404).json({
        status_code: 404,
        message: "Category not found",
      });
    }

    const saveCategory = {
      amount: parseFloat(newExpense.amount),
      category: getCategory.name,
      name: newExpense.name,
      date: newExpense.date
    }

    const newSaveExpense = new Expense(saveCategory)
    
    const result = await newSaveExpense.save();
    res.json({
      status_code: 200,
      message: "Expense Create Successfully",
      result: result,
    });
  } catch (error) {
    res.json(error)
  }
});

router.get("/get-expense-list", loginCheck, async (req, res) => {

});

router.put("/update-expense", loginCheck, async (req, res) => {
  
});

router.delete("/delete-expense", loginCheck, async (req, res) => {
  
});



module.exports = router