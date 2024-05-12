import dotenv from "dotenv";
dotenv.config();
// -- Leave Environment Variables Load at Top of File --
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import apiController from "./api/config/apiController.js";
import { addRequestContext } from "./modules/ContextModule/Context.js";

const app = express();

app.use(addRequestContext());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", apiController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Live - Running of Port: ${PORT}`);
});
