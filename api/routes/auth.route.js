const express = require('express');
const { signup, login, signout, google } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/signout', signout);
// router.post('/google', google);
module.exports = router;
