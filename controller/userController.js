import User from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(new ErrorHandler("Please Fill All Fields", 400));
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return next(new ErrorHandler("User Already Exist", 400));
    }

    const user = await User.create({
        username,
        email,
        password,
    });
    generateToken(user, "User Registered Successfully", 201, res);
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    generateToken(user, "User Logged In Successfully", 200, res);
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
            success: true,
            message: "Logged Out Successfully",
        });
});