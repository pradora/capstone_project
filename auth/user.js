const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
//   getAllUsers,
//   getUserById,
  createUser,
//   updateUser,
//   deleteUser,
} = require("../db/userData/createUser");
const loginUser = require("../db/userData/loginUser")

router.get("/user", (req, res) => {
    res.send("this is user")
});

// register new user
router.post("/user/register", async (req, res, next) => {
    try {
      const user = await createUser(req);
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  });

// user login
router.post("/user/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await loginUser(username, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router