import { Request, Response, NextFunction } from "express";
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
        const organizationId = userOrganization._id;

        const budget = userOrganization.budget;

        const user = new User({
            name,
            password: hashedPassword,
            organization,
            area,
            budget,
            organizationId

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
            maxAge: 1000 * 60 * 60 * 5,
            httpOnly: true
        });

        res.json({ name: user.name, organization: user.organization , budget: user.budget, organizationId: user.organizationId, id: user._id,  massg: " logged in successfully"});
        return

    } catch (error) {

        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to login" });
    }
};

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies.auth_token;
        console.log(token);
        if (!token) {
            res.status(401).json({ error: "No token provided" });
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string, organization: string };
        

        if (!decoded) {
            res.status(401).json({ error: "Invalid token" });
            return
        }

        if (!decoded.id || !decoded.organization) {
            res.status(401).json({ error: "Invalid token" });
            return
        }

        next();

    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
        return
    }
};