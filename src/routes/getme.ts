import express from "express";
const getMeRoute = express.Router();

import { userData } from "../entity/userTable";

export default getMeRoute.get("/", async (req, res) => {
  const userDataRepo = userData.getRepository();
  const getOneById = await userDataRepo.findOne({ where: { user_id: 1 } });
  res.json(getOneById);
});
