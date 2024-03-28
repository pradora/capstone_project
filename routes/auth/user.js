const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: 'pretty',
})
const {
  //   getAllUsers,
  createUser,
  //   updateUser,
  //   deleteUser,
} = require("../../db/userData/createUser");
const loginUser1 = require("../../db/userData/loginUser1")
const getUserBy = require("../../db/userData/getUserBy")
const { emailRegex, passwordRegex, usernameRegex } = require("../../db/userData/regex.js");

router.get("/user", (req, res) => {
  res.send("this is user")
});

// register new user
router.post("/user/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  
  if (!emailRegex.test(email)) {
      res.status(400).send({ error: "Email is not in proper format." });
      return;
  }
  
  if (!passwordRegex.test(password)) {
      res.status(400).send({ error: "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long." });
      return;
  }
  
  if (username.length < 3 || username.length > 20) {
      res.status(400).send({ error: "Username must be between 3 and 20 characters." });
      return;
  }
  
  if (!usernameRegex.test(username)) {
      res.status(400).send({ error: "Username must contain only alphanumeric characters and underscores." });
      return;
  }

  try {
    const existingUserByUsername = await getUserBy(username);
    const existingUserByEmail = await getUserBy(email);
    if (existingUserByUsername) {
      res.status(409).send({ error: "Username already exists." });
      return;
    }
    if (existingUserByEmail) {
      res.status(400).send({ error: "Email already exists." });
      return;
    }

    const user = await createUser(req);
    console.log("User created successfully:", user);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});


// get single user
// router.get("/user/:username", async (req, res, next) => {
//   const username = req.params.username;
//   try {
//     const user = await getUserBy(username);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.json({ user });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// user login
router.post("/user/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await loginUser1(username, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router