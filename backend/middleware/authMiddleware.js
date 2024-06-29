const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.sendStatus(403);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

module.exports = authenticateToken;
