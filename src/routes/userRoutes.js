const { Router } = require("express");
const userHandler = Router();
const createUser = require("../controllers/userControllers/createUser");
const getAllUsers = require("../controllers/userControllers/getAllUsers");
const modifyUser = require("../controllers/userControllers/modifyUser");
const findUserById = require("../controllers/userControllers/findUserById");

//Create an user in the database
userHandler.post("/", async (req, res) => {
  try {
    const {
      name,
      // last_name,
      email,
      // email_verified,
      picture,
      // password,
      // phone_number,
      // adress_street,
      // adress_nro,
      // adress_cp,
      // birthdate,
      // date_creation,
      // quatity_review,
      // user_type,
    } = req.body;
    const newUser = await createUser({
      name,
      // last_name,
      email,
      // email_verified,
      picture,
      // password,
      // phone_number,
      // adress_street,
      // adress_nro,
      // adress_cp,
      // birthdate,
      // date_creation,
      // quatity_review,
      // user_type,
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

userHandler.put("/modify", async (req, res) => {
  const { id } = req.query;
  const newobject = req.body;
  try {
    const changeobj = await modifyUser(id, newobject);
    if (changeobj) {
      res.status(200).send({
        message: `the data for the user with user_id = ${id} has been modified`,
      });
    } else {
      res.send.status(404).send("user not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userHandler.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await findUserById(id);
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userHandler;
