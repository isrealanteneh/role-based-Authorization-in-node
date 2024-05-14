import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

export default function roleAuthorization(role) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookieData = req.headers.cookie;
      const extractToken = cookieData.split("=")[1];
      const token = jwt.verify(
        extractToken,
        process.env.SECRET,
        (err, response) => {
          if (err) throw err;
          else {
            if (response.roles != role) {
              res.status(401).json("Unauthorized");
            } else next();
          }
        }
      );
    } catch (err) {
      res.json({ msg: err.message });
    }
  };
}
