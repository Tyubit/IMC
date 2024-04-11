const { User } = require('../models/user.model');
const errorHandler = require('../middleware/errors');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can update only your account!"))
    }

    try {
        if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);
        
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        }, { new: true });
        const { password, ...user } = updateUser._doc;
        res.status(200).json(user);
    } catch (error) {
        next(errorHandler(500, 'Error updating user'));
    }
};

const deleteUser = async (req, res, next) => {
    console.log("User: ",req.user.id,"Param: ", req.params.id)
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can delete only your account!"))
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(errorHandler(500, 'Error deleting user'));
    }
};

// const getUsers = async (req, res, next) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         next(errorHandler(500, 'Error getting users'));
//     }
// }
module.exports = {updateUser,deleteUser}