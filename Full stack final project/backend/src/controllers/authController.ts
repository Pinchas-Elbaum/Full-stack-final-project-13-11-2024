import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response): Promise<void> => {

    try {
        const { name, password, organization, area } = req.body;
        if (!name || !organization || !password) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            password: hashedPassword,
            organization,
            area    
        });

        await user.save();

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json(userWithoutPassword);
        return

    } catch (error) {
        res.status(500).json({ error: "Failed to save user" });
        return

    }
};