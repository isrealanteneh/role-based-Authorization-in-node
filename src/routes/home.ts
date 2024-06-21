import express from "express";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import roleAuthorization from "../../roleauth.middleware";
const homeRouter = express.Router();

export default homeRouter.get("/", (req, res) => {
  res.json(" Welcome Home ");
});
