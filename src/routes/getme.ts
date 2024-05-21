import express from "express";
const getMeRoute = express.Router();
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables

import { getRepository } from "typeorm";
import { userData } from "../entity/userTable";

export default getMeRoute.get("/", async (req, res) => {
  try {
    // getting the users token from their request
    const getRequest = req.headers.cookie;
    if (!getRequest) {
      return res.status(401).json({ error: "No token found" });
    }
    const getToken = getRequest.split("=")[1];
    const verifiedToken = await jwt.verify(getToken, process.env.SECRET);
    const getEntity = getRepository(userData);

    const userIdToken = verifiedToken["user_id"];
    const findFromDb = await getEntity.find({
      where: { user_id: userIdToken },
    });

    res.json(findFromDb);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
