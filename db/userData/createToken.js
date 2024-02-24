const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createToken(userId, token, expirationDate, currentDate) {
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
        user: { connect: { username: username } },
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = createToken;