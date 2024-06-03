const express = require("express");
const Invoice = require("../../Schemas/Invoice/Invoice");
const { Types, Schema } = require("mongoose");
const router = express.Router();

// get all invoice by branch
router.get("/invoice/byBranch/:id", async (req, res) => {
    const branchId = req.params.id;

    try {
        const result = await Invoice.find({ billing_branch: branchId })
            .populate("billing_branch")
            .populate("invoice_to")
            .populate("service_item")
            .exec();
        res.json({
            status_code: 200,
            message: "Successfully Loaded Data",
            result: result,
        });
    } catch (error) {
        res.json(error);
    }
});
router.get("/invoice/all", async (req, res) => {
    try {
        const result = await Invoice.find()
            .populate("billing_branch")
            .populate("invoice_to")
            .populate("service_item")
            .exec();
        res.json({
            status_code: 200,
            message: "Successfully Loaded Data",
            result: result,
        });
    } catch (error) {
        res.json(error);
    }
});

// create invoice
router.post("/invoice/create", async (req, res) => {
    const newInvoice = new Invoice(req.body);
    try {
        const result = newInvoice.save();
        res.json({
            id: result._id,
            message: "Invoice Create Successfully",
            status_code: 200,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// invoice edit
router.patch("/invoice/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await Invoice.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!result) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({
            status_code: 200,
            message: "Invoice Updated Successfully",
            result: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// invoice Delete

router.delete("/invoice/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Invoice.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({
            status_code: 200,
            message: "Invoice Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
