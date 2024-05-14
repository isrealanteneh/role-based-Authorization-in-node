import express, { response } from "express";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { userData } from "../entity/userTable";
const loginAuth = express.Router();

//load the env variables from .env file to this
dotenv.config();

//middleware for authentication
export default loginAuth.post("/", (req, res) => {
  userData.find().then((data) => {
    const { name, password } = req.body;

    const jsonData = JSON.stringify(data);
    const parsedJson = JSON.parse(jsonData);

    const signUPUser = parsedJson.filter(
      (user) => user.user_name == name && user.passwords == password
    );
    // console.log(req.body);

    //if the login user is signedUp give him a token
    if (signUPUser.length > 0) {
      // preparing token part of payload
      let payload = signUPUser[0];
      delete payload.password;

      //preparing secret key
      const secretKey = process.env.SECRET;

      const option = { expiresIn: "1h" };

      const userToken = jwt.sign(payload, secretKey, option);

      res.cookie("userToken", userToken).redirect("/home");
    } else res.json({ msg: "Please you have to Sign UP first" });

    return res.end();
  });
});
