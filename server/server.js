// const express = require("express");
// const path = require("path");
import path from "path";
import express from "express";
import mongoose from "mongoose";
import { DB_URL } from "./db_access.js";
// import bodyParser from "body-parser";
import router from "./router.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/api", router);

// Чтобы работал react-router
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

async function startApp() {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
}

startApp();
