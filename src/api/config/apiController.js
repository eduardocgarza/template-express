import express from "express";
const apiController = express.Router();

import getRootHandler from "../routes/status/getRoot.js";
import getStatusHandler from "../routes/status/getStatus.js";
import messagesController from "../routes/messages/messagesController.js";
import accountsController from "../routes/accounts/accountsController.js";


apiController.get("/", getRootHandler);
apiController.get("/status", getStatusHandler);

apiController.use("/accounts", accountsController);
apiController.use("/messages", messagesController);

export default apiController;
