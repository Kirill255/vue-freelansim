import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const router = express.Router();

import User from "../models/User";
import auth from "../middleware/auth";

// create strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    User.authenticate()
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// /api/account/register, create new account, here a field username not email, because passport-local-mongoose so works
router.post("/register", (req, res, next) => {
  User.register(new User({ username: req.body.email }), req.body.password, (err) => {
    if (err) return next(err);
    return res.json({ success: true, message: "Registered successfully" });
  });
});

// /api/account/login, pass our strategy, and generate a token
router.post("/login", passport.authenticate("local"), auth.generateAccessToken, (req, res) => {
  return res.json({ success: true, message: "Logined successfully", email: req.user.username, token: req.token });
});

// /api/account/logout, check the token
router.get("/logout", auth.authenticate, (req, res) => {
  req.logout();
  return res.json({ success: true, message: "Successfully logged out" });
});

// /api/account/me, just a test route, check the token
router.get("/me", auth.authenticate, (req, res) => {
  return res.json({ success: true, user: req.user });
});

export default router;

/*
if (err) return res.json({ success: false, error: err });
return res.json({ success: true, data: data });
*/
