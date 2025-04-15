import log4js from "log4js";
import config from "./config.env.js"; // Asegúrate de que la ruta sea correcta

log4js.configure({
  appenders: {
    fileAppender: {
      type: "file",
      filename: "logs/app.log",
    },
    consoleAppender: {
      type: "console",
    },
  },
  categories: {
    default: { appenders: ["fileAppender", "consoleAppender"], level: "debug" },
    stg: { appenders: ["fileAppender"], level: "info" },
    prod: { appenders: ["fileAppender"], level: "trace" },
  },
});

const logger = log4js.getLogger(
  config.app.MODE === "dev" ? "default" : config.app.MODE
);

export default logger;

/*
MENSAJES DE LOG:
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
*/
