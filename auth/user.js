const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
//   getAllUsers,
//   getUserById,
//   loginUser,
  createNewUser,
//   updateUser,
//   deleteUser,
} = require("../db/user");

router.get("/user", (req, res) => {
    res.send("this is user")
});

// register new user
router.post("/users/register", async (req, res, next) => {
    try {
      const user = await createNewUser(req);
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  });

module.exports = router