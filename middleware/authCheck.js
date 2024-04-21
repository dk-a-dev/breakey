import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import {catchAsyncErrors} from './catchAsyncErrors.js';
import ErrorHandler from './errorHandler.js';

export const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token= (req.cookies.token);
    console.log(token);
    if (!token) {
        return next(new ErrorHandler('Login First to Access this Resource', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});