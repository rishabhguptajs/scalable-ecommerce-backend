import { Router } from "express";
import * as userController from '../controllers/userController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { getUserProfileValidation, loginUserValidation, registerUserValidation, resetPasswordValidation, updateUserValidation, validate } from "../utils/validationUtils";

const router = Router();

router.post('/register', registerUserValidation, validate, userController.registerUser);
router.post('/login', loginUserValidation, validate, userController.loginUser);
router.post('/reset-password', resetPasswordValidation, validate, userController.resetPassword);

router.get('/profile/:userId', authMiddleware, getUserProfileValidation, validate,  userController.getUserProfile);
router.put('/profile/:userId', authMiddleware, updateUserValidation, validate, userController.updateUser);

export default router;