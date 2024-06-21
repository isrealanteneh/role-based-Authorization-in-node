// middleware to authenticate the user ba,

import express from "express";
const getMeRoute = express.Router();
import { studentData } from "../entity/studentTable";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { getRepository } from "typeorm";
dotenv.config();

export default getMeRoute.get("/", (req, res) => {
  const token = req.headers.cookie;
  // get the token data only
  const onlyToken = token.split("=")[1];
  jwt.verify(onlyToken, process.env.SECRET, async function (err, response) {
    if (response) {
      const studentRepo = getRepository(studentData);
      const findData = await studentRepo
        .find({ where: { student_id: response.id } })
        .then((data) => {
          if (data.length > 0) {
            // making new object from the two tables and collect user id , user name from users table and grade from student table
            let getMe = {
              id: response.id,
              name: response.name,
              grade: data[0].grade,
            };
            res.json(getMe);
            res.end();
          }
        });
    } else throw err;
  });
});
