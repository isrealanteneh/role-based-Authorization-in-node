import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

export default function roleAuthorization(role) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookieData = req.headers.cookie;
      const extractToken = cookieData.split("=")[1];
      const token = await jwt.verify(
        extractToken,
        process.env.SECRET,
        (err, response) => {
          if (err) throw err;
          else {
            if (response.roles in role) {
              return res.status(401).json("Unauthorized");
            } else next();
          }
        }
      );
    } catch (err) {
      return res.json({ msg: err.message });
    }
  };
}
