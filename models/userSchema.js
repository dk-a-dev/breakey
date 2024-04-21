import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User Name Is Required!"],
        trim: true,
        minLength: [3, "User Name Must Contain At Least 3 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Please Enter A Valid Email Address!"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
        select: false,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;