import { Request, Response, NextFunction, response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export default function authUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //check if the user has cookie
  try {
    const cookieData = req.headers.cookie;
    const extractToken = cookieData.split("=")[1];
    const verifyUser = jwt.verify(
      extractToken,
      process.env.SECRET,
      (err, response): void => {
        if (err) {
          res.json("please sign up first");
        } else {
          next();
        }
      }
    );
  } catch (err) {
    res.json(" Please login first ");
  }
  return res.end();
}
