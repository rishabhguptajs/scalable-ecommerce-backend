import { body, validationResult } from "express-validator";

export const registerUserValidation = [
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
]

export const loginUserValidation = [
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

export const resetPasswordValidation = [
    body('email').isEmail().withMessage('Invalid Email Address'),
]

export const getUserProfileValidation = [
    body('userId').notEmpty().withMessage('User ID is required'),
]

export const updateUserValidation = [
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('name').notEmpty().withMessage('Name is required'),
]

export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };