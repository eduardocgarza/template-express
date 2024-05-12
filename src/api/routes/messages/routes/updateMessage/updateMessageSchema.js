import { body } from "express-validator";

const updateMessageSchema = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 1, max: 500 })
    .withMessage("Message must be between 1 and 500 characters long"),
  body("accountID")
    .trim()
    .notEmpty()
    .withMessage("Account ID is required")
    .isInt()
    .withMessage("Account ID must be an integer"),
];

export default updateMessageSchema;
