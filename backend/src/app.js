require("dotenv").config();
const path = require("path");

const cors = require("cors");

const {
  createOne,
  browse,
  removeOne,
} = require("./controller/image.controller.js");

const fileUpload = require("./middleware/multer.js");

const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/image", fileUpload, createOne);
app.get("/image", browse);
app.delete("/image/:id", removeOne);

app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.get("*", (req, res) => res.status(404).json({ message: "Not found !" }));

module.exports = app;
