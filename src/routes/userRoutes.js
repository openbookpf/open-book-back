const { Router } = require("express");
const userHandler = Router();
const createUser = require("../controllers/userControllers/createUser");
const getAllUsers = require("../controllers/userControllers/getAllUsers");
const checkJwt = require("../middleware/auth0log.js");
const modifyUser = require("../controllers/userControllers/modifyUser");
const findUserById = require("../controllers/userControllers/findUserById");
const findUserByName = require("../controllers/userControllers/findUserByName.js");
const modifyUserByName = require("../controllers/userControllers/modifyUserByName.js");
const getUserBookCollection = require("../controllers/userControllers/getUserBooksCollection.js");
// const deleteUser = require("../controllers/userControllers/deleteUser");
// holaaaa

//Create an user in the database
// userHandler.get("/id/:user_id", async (req, res) => {
//   const { user_id } = req.params;
//   try {
//     const findUser = await findUserById(user_id);
//     res.status(200).json(findUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

userHandler.get("/book-collection", async (req, res) => {
  const { idAuth0 } = req.query;
  try {
    const userBookCollection = await getUserBookCollection(idAuth0);
    res.status(200).json(userBookCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userHandler.post("/", async (req, res) => {
  try {
    const { user_name, email_address, picture, password, idAuth0 } = req.body;
    const newUser = await createUser({
      user_name,
      email_address,
      idAuth0,
      picture,
      password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userHandler.get("/findbyname/:user_name", async (req, res) => {
  const { user_name } = req.params;
  try {
    const findUser = await findUserByName(user_name);
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userHandler.put("/modify", async (req, res) => {
  const { user_id } = req.query;
  const updatedData = req.body;
  try {
    const updatedUser = await modifyUser(user_id, updatedData);
    if (updatedUser) {
      res.status(200).send({
        message: `the data for the user with user_id = ${user_id} has been modified`,
      });
    } else {
      res.send.status(404).send("user not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

//Get all users registered in the database
userHandler.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

userHandler.put("/modifybyname", async (req, res) => {
  const { user_name } = req.query;
  const newobject = req.body;
  try {
    const changeobj = await modifyUserByName(user_name, newobject);
    if (changeobj) {
      res.status(200).send({
        message: `the data for the user with user_name = ${user_name} has been modified`,
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
