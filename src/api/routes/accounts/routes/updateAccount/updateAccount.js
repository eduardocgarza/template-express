import { validationResult } from "express-validator";
import Account from "../../../../../modules/DatabaseModule/providers/mySQL/models/Account.js";

export default async function updateAccountHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const accountID = req.params.accountID;
  const accountData = req.body;
  
  const account = new Account({ id: accountID });
  await account.get();
  await account.update(accountData);
  return res.json({
    status: "success",
    account,
  });
}
