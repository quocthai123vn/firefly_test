const {
  addUserHandler,
  getUserByIdHandler,
  getUserByNameHandler,
  editUserHandler,
  deleteUserHandler,
  findNearestUserHandler,
} = require("../handlers/users.handler");
const ResponseHelper = require("../helper/response.helper");

const addUserController = (req, res) => {
  try {
    const { firstName, lastName, age, coordinate } = req.body;
    const result = addUserHandler(firstName, lastName, age, coordinate);
    return res.json(ResponseHelper.resOk(result));
  } catch (error) {
    return res.json(ResponseHelper.resFail(error));
  }
};

const getUserByIdController = (req, res) => {
  try {
    const { id } = req.query;
    const result = getUserByIdHandler(id);
    return res.json(ResponseHelper.resOk(result));
  } catch (error) {
    return res.json(ResponseHelper.resFail(error));
  }
};

const getUserByNameController = (req, res) => {
  try {
    const { name } = req.query;
    const result = getUserByNameHandler(name);
    return res.json(ResponseHelper.resOk(result));
  } catch (error) {
    return res.json(ResponseHelper.resFail(error));
  }
};

const editUserController = (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age, coordinate } = req.body;
    const result = editUserHandler(id, {
      firstName,
      lastName,
      age,
      coordinate,
    });
    return res.json(ResponseHelper.resOk(result));
  } catch (error) {
    return res.json(ResponseHelper.resFail(error));
  }
};

const deleteUserController = (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteUserHandler(id);
    return res.json(ResponseHelper.resOk(result));
  } catch (error) {
    return res.json(ResponseHelper.resFail(error));
  }
};

const findNearestUserController = (req, res) => {
  try {
    const { numUser, userId } = req.query;
    const result = findNearestUserHandler(numUser, userId);
    return res.json(ResponseHelper.resOk(result));
  } catch (error) {
    return res.json(ResponseHelper.resFail(error));
  }
};

module.exports = {
  addUserController,
  getUserByIdController,
  getUserByNameController,
  editUserController,
  deleteUserController,
  findNearestUserController
};
