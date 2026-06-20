const jwt = require("jsonwebtoken");

const JWT_SECRET = require("../config/auth");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).send({
            message: "No token provided"
        });

    }

    try {

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).send({
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;