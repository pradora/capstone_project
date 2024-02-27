const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createToken = async (userId, token, expirationDate, currentDate) => {
  console.log("-------In createToken.js----------")
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
        user: { connect: { id: userId } },
        tokens: token,
      },
    });

    console.log("Token created and stored successfully in the database.");
  } catch (error) {
    console.error("Error storing token in the database:", error);
    throw error;
  }
};

module.exports = createToken;