const jwt = require('jsonwebtoken');
const errorHandler = require('../middleware/errors');

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, 'No token provided'));
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(errorHandler(403, 'Invalid token'));
        req.user = decoded;
        next();
    });
};

module.exports = verifyUser;