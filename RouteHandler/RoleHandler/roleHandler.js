const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const permissionCheck = require("../../Middleware/checkPermission");
const Role = require("../../Schemas/Role/role");
const checkSinglePermission = require("../../Middleware/checkSinglePermission");
const RoleGroup = mongoose.model("Model", {}, "roleGroup");
const status = require("http-status")

router.get("/get-role", loginCheck, permissionCheck, async (req, res) => {
  try {
    checkSinglePermission("role-list", req.body.permit);

    const result = await Role.find();
    res.status(status.OK).json({
      status: status.OK,
      success: true,
      message: "Successfully Loaded Data",
      data: result,
    });
  } catch (error) {
    res.status(status.NO_CONTENT).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/create-role", loginCheck, permissionCheck, async (req, res) => {
  try {
    checkSinglePermission("role-create", req.body.permit);
    const newRole = new Role(req.body);

    const filter = { name: { $in: newRole.permissions } };
    const roleGroup = await RoleGroup.find(filter);
    newRole.roleGroup = roleGroup;
    newRole.roleName = newRole.roleName.toLowerCase();

    const findRole = await Role.findOne({
      roleName: newRole.roleName.toLowerCase(),
    });

    if (!findRole) {
      const result = await newRole.save();
      res.status(200).json({
        success: true,
        message: "Role Created successfully",
        data: result,
      });
    } else {
      return res.json({ message: "This name is already exist" });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-edit-role/:id", loginCheck, permissionCheck, async (req, res) => {
  try {
    checkSinglePermission("role-edit", req.body.permit)
    const id = req.params.id;
    const result = await Role.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully Loaded Data",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
router.patch("/edit-role/:id", loginCheck, permissionCheck, async (req, res) => {
  try {
    checkSinglePermission("role-edit", req.body.permit)
    const id = req.params.id;
    const isSuperAdmin = await Role.findOne({_id: id});
    if(isSuperAdmin.roleName === 'super admin'){
      return res.status(status.BAD_REQUEST).json({message: 'this is not modifiable', status: status.BAD_REQUEST})
    }
    const updates = req.body;
    const filter = { name: { $in: updates.permissions } };
    const roleGroup = await RoleGroup.find(filter);
    updates.roleGroup = roleGroup;
    updates.roleName = updates.roleName.toLowerCase();

    const result = await Role.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: "client not found" });
    }
    res.json({
      status_code: 200,
      message: "Role Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-role/:id", loginCheck, permissionCheck, async (req, res) => {
  try {
    checkSinglePermission("role-delete", req.body.permit)
    const id = req.params.id;
    const result = await Role.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json({
      status_code: 200,
      message: "Role Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
