import express from "express";
import apiController from "./api/config/apiController.js";

const app = express(); 

import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api", apiController);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
