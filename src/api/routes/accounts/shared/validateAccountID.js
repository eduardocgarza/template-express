import { param } from "express-validator";

const validateAccountID = [
  param("accountID")
    .isNumeric()
    .withMessage("Account ID must be numeric")
    .toInt(),
];

export default validateAccountID;
