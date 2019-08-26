import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

const TOKENTIME = 60 * 60 * 24 * 30; // 30 days
const SECRET = "very secret string";

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
  req.token = jwt.sign({ id: req.user.id }, SECRET, { expiresIn: TOKENTIME });
  next();
};

export default { authenticate, generateAccessToken };
