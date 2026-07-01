import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as usersModel from "../models/users.model.js";
import CustomError from "../utils/CustomError.js";

dotenv.config();

export const login = async (email, password) => {
  const user = usersModel.findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new CustomError("Credenciales invalidas", 401);
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return token;
};
