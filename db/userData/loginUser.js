const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createToken = require("./createToken.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

async function loginUser(username, password) {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
  
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.WEB_TOKEN,
      { expiresIn: "1w" }
    );
    console.log(token);
  
    const currentDate = new Date();
    const expirationDate = new Date();
  
    // Call createToken function to store the token in the database
    await createToken(user.id, token, expirationDate, currentDate);
  
    // Return the user and token information
    return {
      user: { id: user.id, username: user.username },
      token,
    };
}

module.exports = loginUser;