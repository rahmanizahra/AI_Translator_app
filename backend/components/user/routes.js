const router = require('express').Router();
const db = require('./data.js');
const controller = require('./index.js');
const verifyToken = require('../../middleware/verifyToken.js');
router.post('/create', async (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = await controller.encrypt(password);
    console.log(encryptedPassword);
    const result = await db.createUser(username, encryptedPassword);
    console.log(result);
    res.json(result);
});
router.post('/delete', verifyToken, async (req, res) => {
    const username = req.body.user;
    const result = await db.deleteUser(username);
    res.json(result);
});
router.post('/update/password', verifyToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const username = req.body.user;
    const user = await db.getUser(username);
    console.log(user);
    const isCorrectPassword = await controller.verifyPassword(oldPassword, user.password);
    if(!isCorrectPassword) {
        res.json({ success: false, message: 'Old password is invalid.' });
    };
    const encryptedPassword = await controller.encrypt(newPassword);
    const result = await db.updatePassword(username, encryptedPassword);
    res.json({ success: true, message: 'Password updated.' });
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUser(username);
    if (user) {
        const isCorrectPassword = await controller.verifyPassword(password, user.password);
        if (isCorrectPassword) {
            const token = await controller.generateToken(user.username);
            res.json({ token });
            console.log(token);
        } else {
            res.json({ success: false });
        }
    } else {
        res.json({ success: false });
    }
});
module.exports = router;