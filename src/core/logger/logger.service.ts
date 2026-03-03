import { Injectable, LoggerService } from "@nestjs/common";
import fs from "fs";
import path from "path";
import pino, { Logger } from "pino";

@Injectable()
export class AppLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    const isProd = process.env.NODE_ENV === "production";

    const logDir = path.join(process.cwd(), "logs");

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const today = new Date().toISOString().split("T")[0];
    const logFilePath = path.join(logDir, `${today}.log`);

    const transport = pino.transport({
      targets: [
        {
          target: "pino/file",
          level: "debug",
          options: {
            destination: logFilePath,
            mkdir: true
          }
        },
        ...(!isProd
          ? [
              {
                target: "pino-pretty",
                level: "debug",
                options: {
                  colorize: true,
                  ignore: "pid,hostname",
                  translateTime: "HH:MM:ss"
                }
              }
            ]
          : [])
      ]
    });

    this.logger = pino(
      {
        level: isProd ? "info" : "debug"
      },
      transport
    );
  }

  log(message: any, context?: string) {
    this.logger.info({ context }, message);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({ trace, context }, message);
  }

  warn(message: any, context?: string) {
    this.logger.warn({ context }, message);
  }

  debug(message: any, context?: string) {
    this.logger.debug({ context }, message);
  }

  verbose(message: any, context?: string) {
    this.logger.trace({ context }, message);
  }
}
