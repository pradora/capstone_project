// createIfNotExists.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createIfNotExists = async (model, data) => {
    const existingRecord = await prisma[model].findFirst({
        where: data,
    });

    if (!existingRecord) {
        await prisma[model].create({
            data: data,
        });
        console.log(`Created ${model} record successfully.`);
    } else {
        console.log(`${model} record already exists. Skipping creation.`);
    }
};

module.exports = createIfNotExists;
