import express from "express";

import mongoose from "mongoose";
import {
  loginValidation,
  postValidation,
  registerValidation,
} from "./validations/validations.js";

import UserModel from "./models/User.js";

import {getAll, getMe, getOne, login, register, create, remove, update} from "./controllers/index.js"
import multer from "multer";
import {handleValidationErrors, checkAuth} from "./utils/index.js";

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
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
    success: true,
  });
});

app.get("/posts", getAll);
app.get("/posts/:shortUrl", getOne);
app.post("/posts", checkAuth, postValidation, handleValidationErrors, create);
app.delete("/posts/:id", checkAuth, remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postValidation,
  handleValidationErrors,
  update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK. You can visit it http://localhost:4444/");
});
