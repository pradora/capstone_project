const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create new user
const createNewUser = async (req) => {
    const { username, password, firstName, lastName, email, admin } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      return await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashPassword,
        //   firstName: firstName,
        //   lastName: lastName,
        //   admin: admin,
        },
      });
    } catch (err) {
      throw err;
    }
  };

const createToken = async (userId, token, expirationDate, currentDate) => {
    console.log("token: ", token);
    console.log("id: ", userId);
    console.log("expiration: ", expirationDate);
    try {
      await prisma.token.create({
        data: {
          createdAt: currentDate,
          updatedAt: currentDate,
          valid: true,
          expiration: expirationDate,
          tokens: token,
          user: user,
          userId: userId,
        },
      });
  
      console.log("Token created and stored successfully in the database.");
    } catch (error) {
      console.error("Error storing token in the database:", error);
      throw error;
    }
  };

module.exports = {
    // getAllUsers,
    // getUserById,
    createNewUser,
    // loginUser,
    // updateUser,
    // deleteUser,
    // findUserByToken,
};