const express = require("express");
const {
  addUserController,
  getUserByIdController,
  getUserByNameController,
  editUserController,
  deleteUserController,
  findNearestUserController,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/add", addUserController);

userRouter.get("/read", getUserByIdController);

userRouter.get("/search", getUserByNameController);

userRouter.put("/edit/:id", editUserController);

userRouter.delete("/edit/:id", deleteUserController);

userRouter.get("/locate", findNearestUserController);

module.exports = userRouter;
