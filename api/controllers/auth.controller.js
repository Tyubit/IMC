const { User } = require('../models/user.model');
const errorHandler = require('../middleware/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    if(email) {
        const user = await User.findOne({ email: email });
        if(user) return next(errorHandler(400, 'User already exists'));
    }
    const newUser = new User({
        name: name,
        email: email,
        password: hashPassword
    });

    try {
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        next(errorHandler(500, 'Error creating user'));
    }
};

const login = async (req, res, next) => {
    const { email, password, appType } = req.body;
    const expiresIn = appType === 'web' ? '1h' : '365d';
    
    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) return next(errorHandler(401, 'Invalid email or password'));

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid email or password'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: expiresIn });
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser);
    } catch (error) {
        console.log(error);
        next(errorHandler(500, 'Error logging in'));
    }
};

const signout = async (req, res) => {
    res.clearCookie('token').status(200).json({
        message: 'User logged out successfully'
    });
};

module.exports = {signup,login,signout};
