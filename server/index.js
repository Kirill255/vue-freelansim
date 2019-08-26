import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";

import passport from "passport";

import { getSecret } from "./secrets";
import auth from "./routes/account";

const API_PORT = getSecret("apiPort") || 3001; // порт сменил на 3001 т.к. react на 3000

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/account", auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message);
});

app.listen(API_PORT, () => {
  // eslint-disable-next-line
  console.log(`Example app listening on port ${API_PORT} -> http://localhost:${API_PORT}`);
});
