const { Router } = require("express");

const userHandler = Router();
const createUser = require("./controllers/createUser");
const getAllUsers = require("./controllers/getAllUsers");
const deleteUser = require("./controllers/deleteUser");

//Create an user in the database
userHandler.post("/", async (req, res) => {
  try {
    const { user_name, email_address, phone_number, password } = req.body;
    const newUser = await createUser({
      user_name,
      email_address,
      phone_number,
      password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get all users registered in the database
userHandler.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete an user from the database

userHandler.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json({ user_deleted: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userHandler;