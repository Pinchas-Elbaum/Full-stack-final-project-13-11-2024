import { Router } from "express";
import { getAllMissiles, getOrganizationMissiles,  updateOrganizationMissiles} from "../controllers/dataController";
const authRoutes = Router();

authRoutes.get("/missiles", getAllMissiles);
authRoutes.get("/organizationMissiles/:id", getOrganizationMissiles);
authRoutes.put("/organizationMissiles/:id", updateOrganizationMissiles);



export default authRoutes;