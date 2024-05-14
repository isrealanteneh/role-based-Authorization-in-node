import express from "express";
import { createConnection, Connection } from "typeorm";

//importing tables
import { userData } from "./entity/userTable";
import { studentData } from "./entity/studentTable";

//importing routes
import homeRouter from "./routes/home";
import getMeRoute from "./routes/getme";
import getStudentRouter from "./routes/getstudent";
import getStudentGrade from "./routes/getstudentgrade";

//middleware
import authUser from "../auth.middleware";
import roleAuthorization from "../roleauth.middleware";

// login route
import loginAuth from "./middleware/login";

const app = express();
const port = 2000;

// create connection with typeorm
const connection = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "israel23",
  database: "grading_db",
  logging: false,
  synchronize: true,
  entities: [userData, studentData],
});

app.use(express.json());

app.use("/login", loginAuth);

app.use("/home", authUser, roleAuthorization("student"), homeRouter);

app.use("/getme", authUser, roleAuthorization("student"), getMeRoute);

app.use(
  "/getstudents",
  authUser,
  roleAuthorization("director"),
  getStudentRouter
);

app.use(
  "/getstudentsgrade",
  authUser,
  roleAuthorization("director"),
  getStudentGrade
);

app.listen(port, (): void => {
  console.log("Sever is runing on port ", port);
});
