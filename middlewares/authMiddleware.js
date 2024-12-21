const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                res.status(404);
                throw new Error("User not found");
            }

            next();
        } catch (error) {
            console.error("Authentication Error:", error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        console.log("Authorization Header is missing");
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };
