import Missille from "../models/missillesModel";
import Organization from "../models/organizationModel";
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
        const { name , amount } = req.body;

        if (!id || !name || !amount) {
            res.status(400).json({ error: "Missing required fields" });
            return
        }

        const organization = await Organization.findById({ _id: id });

        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return
        }

        if(! await Missille.findOne({ name })) {
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