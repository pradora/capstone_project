const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get product by id
const getSingleProduct = async (id) => {
    try {
      return await prisma.product.findFirst({
        where: {
          id: Number(id),
        },
      });
    } catch (err) {
      throw err;
    }
};

module.exports = getSingleProduct;