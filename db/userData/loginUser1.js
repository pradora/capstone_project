const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createToken = require("./createToken.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const getUserBy = require("./getUserBy.js")

const cleanupTokensForUser = async(userId) => {
    await prisma.token.deleteMany({
      where: {
        userId: userId,
      },
    });
  }

const loginUser1 = async(username, password) => {
    const user = await getUserBy(username, password);
  
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
  
    try {
      await cleanupTokensForUser(user.id);
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.WEB_TOKEN,
        { expiresIn: "1w" }
      );
  
      const currentDate = new Date();
      const expirationDate = new Date();
  
      await createToken(user.id, token, expirationDate, currentDate);
  
      return {
        user: { id: user.id, username: user.username, admin: user.admin },
        token,
      };
    } catch (error) {
      console.error("Error during login and token cleanup:", error);
      throw error;
    }
}
  module.exports = loginUser1;