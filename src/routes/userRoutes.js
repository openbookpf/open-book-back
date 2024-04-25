const { Router } = require("express");
const userHandler = Router();
const createUser = require("../controllers/userControllers/createUser");
const getAllUsers = require("../controllers/userControllers/getAllUsers");
const checkJwt = require("../middleware/auth0log.js");
const modifyUser = require("../controllers/userControllers/modifyUser");
const findUserById = require("../controllers/userControllers/findUserById");
const findUserByName = require("../controllers/userControllers/findUserByName.js");
// const deleteUser = require("../controllers/userControllers/deleteUser");

//Create an user in the database
userHandler.post("/", async (req, res) => {
  try {
    const { user_name, email_address, picture } = req.body;
    const newUser = await createUser({
      user_name,
      email_address,
      picture,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userHandler.put("/modify", async (req, res) => {
  const { user_id } = req.query;
  const newobject = req.body;
  try {
    const changeobj = await modifyUser(user_id, newobject);
    if (changeobj) {
      res.status(200).send({
        message: `the data for the user with user_id = ${user_id} has been modified`,
      });
    } else {
      res.send.status(404).send("user not found");
    }
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

userHandler.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const findUser = await findUserById(user_id);
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userHandler.get("/:user_name", async (req, res) => {
  const { user_name } = req.params;
  try {
    const findUser = await findUserById(user_name);
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userHandler.put("/modifybyname", async (req, res) => {
  const { user_name } = req.query;
  const newobject = req.body;
  try {
    const changeobj = await modifyUser(user_name, newobject);
    if (changeobj) {
      res.status(200).send({
        message: `the data for the user with user_id = ${user_name} has been modified`,
      });
    } else {
      res.send.status(404).send("user not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete an user from the database
// userHandler.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedUser = await deleteUser(id);
//     res.status(200).json({ user_deleted: deletedUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

userHandler.get("/authenticate", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

module.exports = userHandler;
