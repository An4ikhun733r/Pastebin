import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "The minimum length of password is 5").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "The minimum length of password is 5").isLength({ min: 5 }),
  body("fullName", "The minimum length of fullname is 3").isLength({ min: 3 }),
  body("avatarUrl", "Invalid url format").optional().isURL(),
];

export const postValidation = [
  body("title", "Invalid title format").isLength({ min: 3 }).isString(),
  body("tags", "Invalid tags format").isLength({ min: 5 }).optional().isString(),
  body("text", "Invalid text format").isLength({ min: 10 }).isString(),
  body("imageUrl", "Invalid url format").optional().isString(),
];
