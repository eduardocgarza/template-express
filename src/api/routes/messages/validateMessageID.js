import { param } from "express-validator";

const validateMessageID = [
  param("messageID")
    .isNumeric()
    .withMessage("Message ID must be numeric")
    .toInt(),
];

export default validateMessageID;
