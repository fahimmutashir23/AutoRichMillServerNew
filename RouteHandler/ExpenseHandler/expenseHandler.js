const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Expense = require("../../Schemas/Expense/expense");
const ExpenseCategory = require("../../Schemas/Expense/category");
const ExpenseReceipt = require("../../Schemas/Expense/Receipt");

router.get("/get-expense-list", async (req, res) => {
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

router.post("/create-expense", async (req, res) => {
    const newExpense = new Expense(req.body);
    console.log(newExpense);
    try {
        const result = newExpense.save();
        res.json({
            id: result._id,
            message: "Expense Create Successfully",
            status_code: 200,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

//update
router.patch("/update-expense/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await Expense.findByIdAndUpdate(id, updates, {
            new: true,
        });
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

// expense Category Handler

// get all categories
router.get("/expense/category/all", async (req, res) => {
    try {
        const result = await ExpenseCategory.find();
        res.json({
            status_code: 200,
            message: "Successfully Loaded Data",
            result: result,
        });
    } catch (error) {
        res.json(error);
    }
});

// create categories
router.post("/expense/category/create", async (req, res) => {
    const newExpense = new ExpenseCategory(req.body);
    try {
        const result = newExpense.save();
        res.json({
            id: result._id,
            message: "Expense Category Create Successfully",
            status_code: 200,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// categories edit
router.patch("/expense/category/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await ExpenseCategory.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!result) {
            return res
                .status(404)
                .json({ message: "Expense Category not found" });
        }
        res.json({
            status_code: 200,
            message: "Expense Category Updated Successfully",
            result: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// categories Delete

router.delete("/expense/category/delete/:id", loginCheck, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ExpenseCategory.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json({
            status_code: 200,
            message: "Expense Category Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// expense Receipt Handler

// get all receipt
router.get("/expense/receipt/all", async (req, res) => {
    try {
        const result = await ExpenseReceipt.find();
        res.json({
            status_code: 200,
            message: "Successfully Loaded Data",
            result: result,
        });
    } catch (error) {
        res.json(error);
    }
});

// create receipt
router.post("/expense/receipt/create", async (req, res) => {
    const newExpense = new ExpenseReceipt(req.body);
    try {
        const result = newExpense.save();
        res.json({
            id: result._id,
            message: "Expense Receipt Create Successfully",
            status_code: 200,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// receipt edit
router.patch("/expense/receipt/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await ExpenseReceipt.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!result) {
            return res
                .status(404)
                .json({ message: "Expense receipt not found" });
        }
        res.json({
            status_code: 200,
            message: "Expense Category Updated Successfully",
            result: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// receipt Delete

router.delete("/expense/receipt/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ExpenseReceipt.findByIdAndDelete(id);
        if (!result) {
            return res
                .status(404)
                .json({ message: "Expense receipt not found" });
        }
        res.json({
            status_code: 200,
            message: "Expense Category Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
