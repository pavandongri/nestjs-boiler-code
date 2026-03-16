import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { AppLogger } from "./core/logger/logger.service";

async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ["warn", "error"]
  });

  const logger = app.get(AppLogger);
  app.useLogger(logger);

  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") ?? 3000;
  const host = config.get<string>("HOST") ?? "localhost";

  app.setGlobalPrefix("api/v1");

  await app.listen(port, host);

  logger.log(`🚀 Server running on http://${host}:${port}`);
}

main();
