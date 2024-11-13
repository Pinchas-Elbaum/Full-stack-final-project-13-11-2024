import Missille from "../models/missillesModel";
import Organization from "../models/organizationModel";
import User from "../models/userModel";
import { Request, Response } from "express";

export const getAllMissiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const missiles = await Missille.find();
        res.status(200).json(missiles);
        return

    } catch (error) {

        res.status(500).json({ error: "Failed to fetch missiles" });
        return
    }
};

export const getOrganizationMissiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const organization = await Organization.findById({ _id: id });
        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return
        }
        const missiles = organization.resources;

        res.status(200).json(missiles);
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch missiles" });
        return
    }
};

export const updateOrganizationMissiles = async (req: Request, res: Response): Promise<void> => {
    try {

        const { id } = req.params;
        const { name, amount } = req.body;

        if (!id || !name || !amount) {
            res.status(400).json({ error: "Missing required fields" });
            return
        }

        const organization = await Organization.findById({ _id: id });

        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return
        }

        if (! await Missille.findOne({ name })) {
            res.status(404).json({ error: "Missile not found" });
            return
        }

        const resources = organization.resources;

        const isMissileExistsAtOraganization = resources.find(resource => resource.name === name)

        if (isMissileExistsAtOraganization) {
            resources.map(resource => resource.name === name ? resource.amount += amount : resource);
        }
        else {
            resources.push({ name: name, amount: amount });
        }

        organization.resources = resources;
        await organization.save();

        res.status(200).json(organization);
        return

    } catch (error) {
        res.status(500).json({ error: "Failed to update organization missiles" });
        return
    }
};

export const updateUserBudget = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { budget } = req.body;

        if (!id || !budget) {
            res.status(400).json({ error: "Missing required fields" });
            return
        }

        if (budget < 0) {
            res.status(400).json({ error: "Budget cannot be negative" });
            return
        }

        const user = await User.findById({ _id: id });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        user.budget = budget;
        await user.save();

        res.status(200).json(user);
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to update user budget" });
        return
    }
};

export const buyMissile = async (req: Request, res: Response): Promise<void> => {

    try {
        const { id } = req.params;
        const { name, amount } = req.body;

        if (!id || !name || !amount) {
            res.status(400).json({ error: "Missing required fields" });
            return
        }

        const user = await User.findById({ _id: id });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        const missile = await Missille.findOne({ name });

        if (!missile) {
            res.status(404).json({ error: "Missile not found" });
            return
        }

        if (user.budget < missile.price * amount) {
            res.status(400).json({ error: "Not enough budget" });
            return
        }

        const organization = await Organization.findOne({ name: user.organization });

        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return
        }

        const resources = organization.resources;

        const isMissileExistsAtOraganization = resources.find(resource => resource.name === name)

        if (isMissileExistsAtOraganization) {
            resources.map(resource => resource.name === name ? resource.amount += Number(amount) : resource);
        }
        else {
            resources.push({ name, amount });
        }

        organization.resources = resources;
        await organization.save();

        user.budget -= missile.price * amount;
        await user.save();

        res.status(200).json(user);
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to buy missile" });
        return
    }
}