import express from "express"
const apiController = express.Router()

apiController.get("/", (req, res) => {
  res.send("API is working")
})

import authController from "../routes/auth/authController.js";
import messagesController from "../routes/messages/messagesController.js";
import accountsController from "../routes/accounts/accountsController.js";

apiController.get("/", (req, res) => {
  res.send("API is working")
})

apiController.use("/auth", authController)
apiController.use("/messages", messagesController)
apiController.use("/accounts", accountsController)

export default apiController;
