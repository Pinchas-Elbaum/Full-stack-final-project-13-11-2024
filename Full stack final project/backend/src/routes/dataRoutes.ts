import { Router } from "express";
import { getAllMissiles, getOrganizationMissiles,  updateOrganizationMissiles, updateUserBudget} from "../controllers/dataController";
const authRoutes = Router();

authRoutes.get("/missiles", getAllMissiles);
authRoutes.get("/organizationMissiles/:id", getOrganizationMissiles);
authRoutes.put("/organizationMissiles/:id", updateOrganizationMissiles);
authRoutes.put("/updateUserBudget/:id", updateUserBudget);



export default authRoutes;