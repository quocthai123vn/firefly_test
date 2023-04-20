const fs = require("fs-extra");
const { USER_DATA_PATH } = require("../constants/app.constant");

const getAllUsers = () => {
  const files = fs.readFileSync(USER_DATA_PATH, "utf-8");
  const users = files ? JSON.parse(files) : [];
  return users;
};

const addUser = (user) => {
  const users = getAllUsers();
  users.push(user);
  fs.writeFileSync(USER_DATA_PATH, JSON.stringify(users));
};

const updateUsers = (users) => {
  fs.writeFileSync(USER_DATA_PATH, JSON.stringify(users));
};

const getDistance = (coordinateA, coordinateB) => {
  const [x1, y1] = coordinateA.split(":");
  const [x2, y2] = coordinateB.split(":");
  return Math.sqrt((+x1 - x2) ** 2 + (+y1 - y2) ** 2);
};

module.exports = { getAllUsers, addUser, updateUsers, getDistance };
