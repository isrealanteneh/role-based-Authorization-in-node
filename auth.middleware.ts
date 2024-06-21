import { Request, Response, NextFunction, response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export default async function authUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //check if the user has cookie
  try {
    const cookieData = req.headers.cookie;
    const extractToken = cookieData.split("=")[1];
    const verifyUser = await jwt.verify(
      extractToken,
      process.env.SECRET,
      (err, response) => {
        if (err) {
          return res.json("please sign up first");
        } else {
          next();
        }
      }
    );
  } catch (err) {
    return res.json(" Please login first ");
  }
}
