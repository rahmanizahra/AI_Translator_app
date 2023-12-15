const jwt = require('jsonwebtoken');
//const userController = require('../components/user/index.js');

const verifyToken = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(403).send({ auth: false, message: 'Invalid Token' });
        }
        const isValidUser = await userController.verifyUser(decoded.user);
        if (!isValidUser) {
            res.status(403).send({ auth: false, message: 'Invalid User' });
        }
        req.body.user = decoded.user;
        next();
    });
}

module.exports = verifyToken;