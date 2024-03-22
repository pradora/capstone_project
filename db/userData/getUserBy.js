const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

const { idRegex, passwordRegex, usernameRegex, emailRegex, tokenRegex } = require("./regex.js");

const getUserBy = async (input) => {
  if (idRegex.test(input)) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: input,
        },
      });
    } catch (err) {
      throw err;
    }

  } else if (passwordRegex.test(input)) {
    try {
      return await prisma.user.findUnique({
        where: {
          password: input,
        },
      });
    } catch (err) {
      throw err;
    }
  } else if (usernameRegex.test(input)) {
    // console.log(input)
    try {
      return await prisma.user.findFirst({
        where: {
          username: input,
        },
      });
    } catch (err) {
      throw err;
    }

  } else if (emailRegex.test(input)){
    try {
      return await prisma.user.findFirst({
        where: {
          email: input,
        },
      });
    } catch (err) {
      throw err;
    }
  } else if (tokenRegex.test(input)){
    try {
      return await prisma.token.findUnique({
        where: {
          tokens: input,
        },
      });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = getUserBy;