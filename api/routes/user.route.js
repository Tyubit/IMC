const express = require('express');

const { updateUser,deleteUser } = require('../controllers/user.controller');
const verifyUser = require('../utils/verifyUser');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Hello World!');
});
router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);

module.exports = router;