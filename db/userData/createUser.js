const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const hashThing= require("../seedData/hashThing.js")


// create new user
const createUser = async (req) => {
    const { username, email, password, admin} = req.body;
    const hashedPassword = await hashThing(password)
    try {
      return await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
          email: email,
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
    createUser,
    //  loginUser,
    // updateUser,
    // deleteUser,
    // findUserByToken,
};