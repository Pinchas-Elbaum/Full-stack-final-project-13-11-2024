import fs from "fs";
import Missile from "../models/missillesModel";
import Organization from "../models/organizationModel";

export const initialDataToDB = async (): Promise<void> => {

    try {
        const missileData: string = fs.readFileSync("src/data/missiles.json", 'utf-8');
        const missiles = JSON.parse(missileData);

        const organizationData: string = fs.readFileSync("src/data/organizations.json", 'utf-8');
        const organization = JSON.parse(organizationData);

        await Promise.all([
            Missile.insertMany(missiles),
            Organization.insertMany(organization)
        ]);

        console.log("Data inserted successfully");

    } catch (error) {
        
        console.error("Error inserting data:", error);
    }
};