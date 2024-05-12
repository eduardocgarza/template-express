import { v4 as uuidv4 } from "uuid";
import { createNamespace } from "cls-hooked";
import AppLogger from "../LoggerModule/AppLogger.js";

export class ContextManager {
  // Create a namespace for the request context
  static requestContext = createNamespace("request");

  static setLoggerId(id) {
    ContextManager.requestContext.set("loggerId", id);
  }

  static getLoggerId() {
    return ContextManager.requestContext.get("loggerId");
  }
}

function generateUniqueID() {
  return uuidv4().replace(/-/g, "").substring(0, 10).toUpperCase();
}

function withRequestContext(fn) {
  return function (req, res, next) {
    // Combination of Letters and Numbers, Size 20
    const uniqueExecutionID = generateUniqueID();

    ContextManager.requestContext.run(() => {
      // Generate and set a unique logger ID for this context
      ContextManager.setLoggerId(uniqueExecutionID);
      fn(req, res, next);
    });
  };
}

export function addRequestContext() {
  return withRequestContext((req, res, next) => {
    AppLogger.info(`Start - Request Context Middleware`);
    AppLogger.info(`Logger ID: ${ContextManager.getLoggerId()}`);
    next();
  });
}
