import { App } from "./src/app";
import { logger } from "./src/common/logger";
import { __middleware } from "./src/middleware";
import { allRoutes } from "./src/common/routes";

const dotenv = require('dotenv');
dotenv.config()

const PORT = parseInt(process.env.PORT as string); 

const app = new App(PORT, __middleware, allRoutes);

try {
  const DB_URI = process.env.DB_URI as string;
  app.mongoDB(DB_URI);
} catch(e) {
  logger.error(e)
}

app.listen();