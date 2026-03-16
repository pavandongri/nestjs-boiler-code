import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { APP_CONSTANTS } from "./constants/app.contants";
import { db } from "./core/db";
import { AppLogger } from "./core/logger/logger.service";

async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ["warn", "error"]
  });

  const logger = app.get(AppLogger);
  app.useLogger(logger);

  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") ?? 3000;

  app.setGlobalPrefix(APP_CONSTANTS.API_PREFIX);

  try {
    await db.execute("SELECT 1");
    logger.log("✅ Database connected successfully");
  } catch (err) {
    logger.error("❌ Database connection failed", err);
    process.exit(1);
  }

  await app.listen(port);

  logger.log(`🚀 Server running on http://localhost:${port}`);
}

main();
