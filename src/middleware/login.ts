import express, { response } from "express";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { userData } from "../entity/userTable";
import { getRepository } from "typeorm";
const loginAuth = express.Router();

//load the env variables from .env file to this
dotenv.config();

//middleware for authentication
export default loginAuth.post("/", (req, res) => {
  const { name, password } = req.body;
  if (name == null || password == null)
    return res
      .status(402)
      .json({ error: " please inter your name and password" });
  else {
    // find data from data base as promise and resolve it
    const userRepo = getRepository(userData);
    const findData = userRepo
      .find({
        where: { user_name: name, passwords: password },
      })
      .then((data) => {
        if (data.length > 0) {
          // make a new object that used as payload data
          let my_obj = {
            id: data[0].user_id,
            name: data[0].user_name,
            roles: data[0].roles,
          };
          const payload = my_obj;
          const expireTime = { expiresIn: "1h" };
          const token = jwt.sign(payload, process.env.SECRET, expireTime);
          res.cookie("Token data", token).json("Successfully Loggin ");
          res.end();
        } else {
          res.send("User not found ");
        }
      })
      .catch((error) => res.json({ msg: error }));
  }
});
