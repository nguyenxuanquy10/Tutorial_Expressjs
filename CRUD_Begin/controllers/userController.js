const userModel = require('../models/user_model');

//Get users
const getUsers = async(req, res, next) => {
    try {
        const users = await userModel.find({});
        if (!users) {
            return res.status(404).json({
                status: "false",
                message: "Not Found"
            })
        }
        res.status(200).json({
            status: "success",
            data: users
        })
    } catch (err) {
        console.log(err);
    }
}

//Get user
const getUser = async(req, res, next) => {
    try {
        const id = req.params.id;
        const user = userModel.find({ _id: id }); //
        if (!user) {
            return res.status(404).json({
                status: "false",
                message: "Not Found"
            })
        }
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (e) {
        console.log(e)
    }
}

//Create user 
const createUser = async(req, res, next) => {
        try {
            console.log(req.body);
            const newUser = await userModel.create(req.body);
            if (!newUser) {
                return res.status(400).json({
                    status: "false",
                    message: "Can not create"
                })
            }
            res.status(201).json({
                status: "success",
                data: newUser
            })
        } catch (e) {
            console.log(e)
        }
    }
    //Update user 
const updateUser = async(req, res, next) => {
        try {
            const id = req.params.id; //
            const updateUser = await userModel.findByIdAndUpdate(id, req.body);
            if (!updateUser) {
                return res.status(404).json({
                    status: "false",
                    message: "Can not update"
                })
            }
            res.status(200).json({
                status: "success",
                data: updateUser
            })
        } catch (e) {
            console.log(e)
        }
    }
    //Delete user
const deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id;
        const deleteuser = await mongoose.findByIdAndRemove({ _id: id });
        if (!deleteuser) {
            return res.status(400).json({
                status: "false",
                message: "Can not delete"
            })
        }
        res.status(200).json({
            status: "success",
            data: deleteuser
        })
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
}