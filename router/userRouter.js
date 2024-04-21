import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/userController.js';
import { isUserAuthenticated} from '../middleware/authCheck.js';

// import {isUserAuthenticated} from '../middleware/authCheck.js';
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isUserAuthenticated,logoutUser);
// router.get("/me",userProfile);
export default router;