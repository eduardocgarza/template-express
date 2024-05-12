import AppLogger from "../../../modules/LoggerModule/AppLogger.js";

export default async function getRootHandler(req, res) {
  AppLogger.info(`Start - Get Root Route Handler`);

  return res.json({
    status: "success",
  });
}
