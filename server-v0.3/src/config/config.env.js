import { config } from "dotenv";
import { Command } from "commander";

const program = new Command();
program.requiredOption("-m, --mode <mode>", "Server mode", "prod");
program.parse();
const options = program.opts();

config({
  path:
    options.mode == "dev"
      ? "./.env.dev"
      : options.mode == "stg"
      ? "./.env.stg"
      : "./.env.prod",
});

export default {
  app: {
    PORT: process.env.PORT || 8082,
    ADMIN_PWD: process.env.ADMIN_PASSWORD,
    PERSISTENCE: process.env.PERSISTENCE || "MYSQL",
    MODE: process.env.MODE,
  },
  mysql: {
    PORT: process.env.MYSQL_PORT,
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DATABASE: process.env.MYSQL_DATABASE,
  },
  auth: {
    jwt: {
      SECRET: process.env.JWT_SECRET,
    },
  },
};
