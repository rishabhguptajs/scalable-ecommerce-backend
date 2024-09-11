import { Request, Response } from "express";
import * as userService from '../services/userService'

export const registerUser = async(req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const user = await userService.registerUser({ email, password, name });

        res.status(201).json({
            message: "User registered successfully",
            user:{
                email: user.email,
                name: user.name,
            }
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      const result = await userService.authenticateUser(email, password);
      
      if (!result) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      
      const { token, user } = result;
      
      res.status(201).json({ token, user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
  

export const getUserProfile = async(req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);

        if(user){
            res.status(201).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateUser = async(req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await userService.updateUser(userId, req.body);

        res.status(201).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    } 
}

export const resetPassword = async(req: Request, res: Response) =>  {
    try {
        const { email, newPassword } = req.body;

        await userService.resetPassword(email, newPassword);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}