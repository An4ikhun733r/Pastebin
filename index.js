import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  loginValidation,
  postValidation,
  registerValidation,
} from "./validations/validations.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/PostController.js";
import multer from "multer";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@db.cwggyvz.mongodb.net/pastebin?retryWrites=true&w=majority&appName=db"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post("/auth/login", loginValidation, login);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
    success: true,
  });
});

app.get("/posts", getAll);
app.get("/posts/:id", getOne);
app.post("/posts", checkAuth, postValidation, create);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK. You can visit it http://localhost:4444/");
});
