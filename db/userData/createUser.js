const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const hashPassword = require("../seedData/hashPassword.js")


// create new user
const createUser = async (req) => {
    const { username, email, password, admin} = req.body;
    const hashedPassword = await hashPassword(password)
    try {
      return await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          admin: admin,
        //   firstName: firstName,
        //   lastName: lastName,
        },
      });
    } catch (err) {
      throw err;
    }
  };

module.exports = {
    // getAllUsers,
    // getUserById,
    createUser,
    //  loginUser,
    // updateUser,
    // deleteUser,
    // findUserByToken,
};