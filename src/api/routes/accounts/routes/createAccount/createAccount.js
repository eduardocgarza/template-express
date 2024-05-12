import { validationResult } from "express-validator";
import AppLogger from "../../../../../modules/LoggerModule/AppLogger.js";
import Account from "../../../../../modules/DatabaseModule/providers/mySQL/models/Account.js";

export default async function createAccountHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg).join(", ");
    AppLogger.error(`Error creating account: ${errorMessage}`);
    return res.status(400).json({ 
      errors: errors.array() 
    });
  }

  const account = new Account(req.body);
  await account.create();
  AppLogger.info(`Account created successfully: ${account}`);

  return res.json({
    message: "Account created successfully",
    account
  });
}
