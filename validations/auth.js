import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "The minimum length of password is 5").isLength({ min: 5 }),
  body("fullName", "The minimum length of fullname is 3").isLength({ min: 3 }),
  body("avatarUrl", "Invalid url format").optional().isURL(),
];
