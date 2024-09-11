import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
    } catch (error: any) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export const isAdmin = async(req: any, res: any, next: any) => {
    try {
        if(req.user && req.user.role == 'admin'){
            next()
        }
    } catch (error) {
        res.status(401).json({ error: 'Access Denied. Admins only.' });
    }
}