const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create new product
const createProduct = async (req) => {
    try {
      return await prisma.product.create({
        data: {
          name: req.body.name,         
          description: req.body.description,
          price: req.body.price,
          image: req.body.image,
          class: req.body.class,
          stock: req.body.stock,
        },
      });
    } catch (err) {
      throw err;
    }
};

module.exports = createProduct;