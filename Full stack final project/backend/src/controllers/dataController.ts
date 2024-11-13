import Missille from "../models/missillesModel";
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