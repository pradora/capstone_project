// createIfNotExists.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



const createIfNotExists = async(model, data) => {
    try {
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
    } catch (error) {
        if (error.code === 'P2002') {
            console.log(`${model} record with ${JSON.stringify(data)} already exists. Skipping creation.`);
        } else {
            throw error;
        }
    }
}

module.exports = createIfNotExists;
