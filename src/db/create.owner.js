import Admin from "../models/admin.model.js";

import { Crypto } from "../utils/hashed.js";
import config from "../config/app.js";
import { Token } from "../utils/token-servise.js";

const crypto = new Crypto();
const token = new Token();

export const createSuperAdmin = async (req, res) => {
  try {
    const existsSuperAdmin = await Admin.findOne({ role: "superadmin" });
    if (!existsSuperAdmin) {
      const hashedPassword = await crypto.encrypt(config.OWNER_PASSWORD);
      const newAdmin = await Admin.create({
        username: config.OWNER_USERNAME,
        password: hashedPassword,
        role: "superadmin",
      });
 
      console.log("Owner Created");
    }
  } catch (error) {
    console.log(`Error on creating superadmin: ${error}`);
  }
};
