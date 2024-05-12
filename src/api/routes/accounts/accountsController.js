import express from "express";
const accountsController = express.Router();

import getAccountHandler from "./routes/getAccount/getAccount.js";
import createAccountHandler from "./routes/createAccount/createAccount.js";
import updateAccountHandler from "./routes/updateAccount/updateAccount.js";
import activateAccountHandler from "./routes/activateAccount/activateAccount.js";
import deactivateAccountHandler from "./routes/deactivateAccount/deactivateAccount.js";
import deleteAccountHandler from "./routes/deleteAccount/deleteAccount.js";
import createAccountSchema from "./routes/createAccount/createAccountSchema.js";
import updateAccountSchema from "./routes/updateAccount/updateAccountSchema.js";
import validateAccountID from "./shared/validateAccountID.js";

accountsController.post("/", createAccountSchema, createAccountHandler);
accountsController.get("/:accountID", validateAccountID, getAccountHandler);
accountsController.put("/:accountID", validateAccountID, updateAccountSchema, updateAccountHandler);
accountsController.delete("/:accountID", validateAccountID, deleteAccountHandler);
accountsController.put("/:accountID/activate", validateAccountID, activateAccountHandler);
accountsController.put("/:accountID/deactivate", validateAccountID, deactivateAccountHandler);

export default accountsController;
