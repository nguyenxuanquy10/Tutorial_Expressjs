const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                return "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$".test(value)
            },
            message: "Invalid password"
        },
        required: true,
    }
})

//Hash password pre save 
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.comparePassword = async function(cadidatePassword) {
        return bcrypt.compare(cadidatePassword, this.password);
    }
    // Compare password with hashpassword
const userModel = mongoose.model('users', userSchema)
module.exports = userModel;