import { Router } from "express";
import { getAllMissiles, getOrganizationMissiles, buyMissile } from "../controllers/dataController";
import {authenticate} from "../controllers/authController";


const authRoutes = Router();

authRoutes.get("/missiles", getAllMissiles);
authRoutes.get("/organizationMissiles/:id",  getOrganizationMissiles);
authRoutes.put("/buyMissile/:id",authenticate, buyMissile);


export default authRoutes;