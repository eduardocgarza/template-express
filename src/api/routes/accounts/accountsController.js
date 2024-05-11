import express from "express";
const accountsController = express.Router();

import getAccountHandler from "./routes/getAccount.js";
import createAccountHandler from "./routes/createAccount.js";
import updateAccountHandler from "./routes/updateAccount.js";
import activateAccountHandler from "./routes/activateAccount.js";
import deactivateAccountHandler from "./routes/deactivateAccount.js";
import deleteAccountHandler from "./routes/deleteAccount.js";

accountsController.post("/", createAccountHandler);
accountsController.get("/:accountID", getAccountHandler);
accountsController.put("/:accountID", updateAccountHandler);
accountsController.delete("/:accountID", deleteAccountHandler);
accountsController.put("/:accountID/activate", activateAccountHandler);
accountsController.put("/:accountID/deactivate", deactivateAccountHandler);

export default accountsController;
