import express from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Ajv from "ajv";
import { userData } from "../entity/userTable";
// import user_schema from "../../user_schema.json";
const getMeRoute = express.Router();
const ajv = new Ajv();
// const validate = ajv.compile(user_schema);

export default getMeRoute.get("/", (req, res) => {
  userData.find().then((data) => {
    const jsonData = JSON.stringify(data);

    const parsedData = JSON.parse(jsonData);

    const cookieData = req.headers.cookie;
    const extractToken = cookieData.split("=")[1];

    const token = jwt.verify(
      extractToken,
      process.env.SECRET,
      (err, response) => {
        if (err) throw err;
        else {
          return response.user_id;
        }
      }
    );
    const mathcedData = parsedData.filter((data) => data.user_id == token);
    if (mathcedData.length > 0) res.json({ mathcedData });
    else res.json({ msg: "No mathcing Data" });

    res.end();
  });
});
