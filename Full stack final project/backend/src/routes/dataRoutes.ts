import { Router } from "express";
import { getAllMissiles } from "../controllers/dataController";
const authRoutes = Router();

authRoutes.get("/missiles", getAllMissiles);


export default authRoutes;