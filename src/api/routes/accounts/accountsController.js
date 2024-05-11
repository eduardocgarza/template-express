import express from "express";
const accountsController = express.Router();

import getAccountHandler from "./routes/getAccount.js";
import updateAccountHandler from "./routes/updateAccount.js";
import activateAccountHandler from "./routes/activateAccount.js";
import deactivateAccountHandler from "./routes/deactivateAccount.js";
import deleteAccountHandler from "./routes/deleteAccount.js";

accountsController.get("/", getAccountHandler);
accountsController.get("/:accountID", updateAccountHandler);
accountsController.put("/:accountID/activate", activateAccountHandler);
accountsController.put("/:accountID/deactivate", deactivateAccountHandler);
accountsController.delete("/:accountID", deleteAccountHandler);

export default accountsController;
