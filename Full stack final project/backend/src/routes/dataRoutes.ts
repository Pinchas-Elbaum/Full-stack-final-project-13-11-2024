import { Router } from "express";
import { getAllMissiles, getOrganizationMissiles } from "../controllers/dataController";
const authRoutes = Router();

authRoutes.get("/missiles", getAllMissiles);
authRoutes.get("/organizationMissiles/:id", getOrganizationMissiles);



export default authRoutes;