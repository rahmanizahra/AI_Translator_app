const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./data.js');

const encrypt = async (password) => {
    if (!password) throw new Error('Password is required.');
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
};

const verifyPassword = async (password, encryptedPassword) => {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
};

const generateToken = async (user) => {
    const token = await jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
};

const getTranslation = async () => {
    const result = await db.getTranslation();
    return result;
};

module.exports = {
    encrypt,
    verifyPassword,
    getTranslation,
    generateToken
};