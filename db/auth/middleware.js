const { getUserBy } = require("../db/getUserBy.js")

const isLoggedIn = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers["authorization"];
        const token = authorizationHeader.replace("Bearer ", "");

        if (!token) {
            throw new Error("Token is missing");
        }

        const tokenFound = await getUserBy(token);

        if (!tokenFound) {
            throw new Error("Token not found or invalid");
        }

        req.userId = tokenFound;

        next();
    } catch (error) {
        console.error("Error in isLoggedIn middleware:", error);
        res.status(401).send("Unauthorized access");
    }
};

module.exports = { isLoggedIn };