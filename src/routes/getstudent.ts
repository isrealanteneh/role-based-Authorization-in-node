import express from "express";
import { userData } from "../entity/userTable";
const getStudentRouter = express.Router();

export default getStudentRouter.get("/", (req, res) => {
  userData.find().then((data) => {
    //data is promise object
    const jsonData = JSON.stringify(data); //convert it into json string
    const parsedData = JSON.parse(jsonData); //read or parse the json string
    const extractData = parsedData.map(({ id, name }) => ({ id, name })); // extract id and name
    res.json(extractData);
  });
});
