import { validationResult } from "express-validator";
import Account from "../../../../../modules/DatabaseModule/providers/mySQL/models/Account.js";
import Message from "../../../../../modules/DatabaseModule/providers/mySQL/models/Message.js";
import AppLogger from "../../../../../modules/LoggerModule/AppLogger.js";

export default async function createMessageHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
    AppLogger.error(`Error creating account: ${errorMessage}`);
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const accountID = req.body.accountID;
  const newMessage = new Message(req.body);
  await newMessage.create();

  const account = new Account({ accountID });
  await account.get();

  return res.json({
    status: "success",
    account,
  });
}
