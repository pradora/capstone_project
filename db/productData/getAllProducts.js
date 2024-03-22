const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all products
const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    throw err;
  }
};

module.exports = getAllProducts;