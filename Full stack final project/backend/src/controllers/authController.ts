import { Request, Response } from "express";
import User from "../models/userModel";
import Organization from "../models/organizationModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {

    try {
        const { name, password, organization, area } = req.body;
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            res.status(400).json({ error: "User name already exists" });
            return;
        }
        if (!name || !organization || !password) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const userOrganization = await Organization.findOne({ name: organization });
        if (!userOrganization) {
            res.status(400).json({ error: "Organization not found" });
            return;
        }

        const budget = userOrganization.budget;
        if (budget < 0) {
            res.status(400).json({ error: "Budget cannot be negative" });
            return;
        }


        const user = new User({
            name,
            password: hashedPassword,
            organization,
            area,
            budget
             
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


export const login = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const user = await User.findOne({ name });

        if (!user) {
            res.status(401).json({ error: "Invalid email or password" });
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid email or password" });
            return
        }

        const token = jwt.sign({ id: user._id, organization: user.organization }, process.env.JWT_SECRET || "", { expiresIn: "5h" });

        res.cookie("auth_token", token, {
            maxAge: 1000*60*60*5,   
            httpOnly: true,
            sameSite: 'strict'
        });

        res.json({ message: "Login successful", token });
        return

    } catch (error) {

        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to login" });
    }
};