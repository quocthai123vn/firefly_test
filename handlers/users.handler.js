const { v4: uuidv4 } = require("uuid");
const {
  addUser,
  getAllUsers,
  updateUsers,
  getDistance,
} = require("../helper/data.helper");

const addUserHandler = (firstName, lastName, age, coordinate) => {
  const coordinateRegex = /^\d{3}:\d{3}$/;
  if (!firstName) {
    throw "Missing first name";
  }
  if (!lastName) {
    throw "Missing last name";
  }
  if (!age || age < 1 || age > 100) {
    throw age ? "Age invalid" : "Missing age";
  }
  if (!coordinate || !coordinateRegex.test(coordinate)) {
    throw coordinate ? "Coordinate invalid" : "Missing coordinate";
  }
  const id = uuidv4();
  const user = {
    id,
    firstName,
    lastName,
    age,
    coordinate,
  };
  addUser(user);
  return user;
};

const getUserByIdHandler = (id) => {
  if (!id) {
    throw "Missing id";
  }
  const users = getAllUsers();
  const user = users.find((x) => x.id === id);
  if (!user) {
    throw "User not found";
  }
  return user;
};

const getUserByNameHandler = (name) => {
  if (!name) {
    throw "Missing name";
  }
  const users = getAllUsers();
  const response = users.filter(
    (x) => x.firstName.startsWith(name) || x.lastName.startsWith(name)
  );
  return response;
};

const editUserHandler = (id, { firstName, lastName, age, coordinate }) => {
  if (!id) {
    throw "Missing id";
  }
  const users = getAllUsers();
  const index = users.findIndex((x) => x.id === id);
  if (index < 0) {
    throw "User not found";
  }
  const updateObj = {
    firstName: firstName || users[index].firstName,
    lastName: lastName || users[index].lastName,
    age: age || users[index].age,
    coordinate: coordinate || users[index].coordinate,
  };
  users[index] = {
    ...users[index],
    ...updateObj,
  };
  updateUsers(users);
  return users[index];
};

const deleteUserHandler = (id) => {
  if (!id) {
    throw "Missing id";
  }
  const users = getAllUsers();
  const newUsers = users.filter((x) => x.id !== id);
  if (users.length === newUsers.length) {
    throw "User not found";
  }
  updateUsers(newUsers);
  return "Delete successful";
};

const findNearestUserHandler = (numUser, userId) => {
  if (!userId) {
    throw "Missing userId";
  }
  if (!numUser || numUser <= 0) {
    throw numUser ? "numUser invalid" : "Missing numUser";
  }
  const users = getAllUsers();
  const targetUser = users.find((x) => x.id === userId);
  if (!targetUser) {
    throw "User not found";
  }
  let distances = users.map((user) => {
    if (user.id !== targetUser.id) {
      return {
        ...user,
        distance: getDistance(user.coordinate, targetUser.coordinate),
      };
    }
  });
  return distances.sort((a, b) => a.distance - b.distance).slice(0, numUser);
};

module.exports = {
  addUserHandler,
  getUserByIdHandler,
  getUserByNameHandler,
  editUserHandler,
  deleteUserHandler,
  findNearestUserHandler,
};
