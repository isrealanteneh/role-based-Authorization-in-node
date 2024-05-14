import express from "express";
import { userData } from "../entity/userTable";
const getStudentGrade = express.Router();

export default getStudentGrade.get("/", (req, res) => {
  userData.find().then((data) => {
    const jsonData = JSON.stringify(data);
    const parsedJson = JSON.parse(jsonData);
    const datas = parsedJson.map(({ id, name, grade }) => ({
      id,
      name,
      grade,
    }));
    res.json(datas);
  });
});
