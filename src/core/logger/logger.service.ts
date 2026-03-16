import { Injectable, LoggerService } from "@nestjs/common";
import fs from "fs";
import path from "path";
import pino, { Logger, TransportTargetOptions } from "pino";

@Injectable()
export class AppLogger implements LoggerService {
  private appLogger: Logger;
  private requestLogger: Logger;

  constructor() {
    const enableConsoleLogs = process.env.ENABLE_CONSOLE_LOGS === "true";

    const baseLogDir = path.join(process.cwd(), "logs");
    const appLogDir = path.join(baseLogDir, "app");
    const requestLogDir = path.join(baseLogDir, "requests");

    [baseLogDir, appLogDir, requestLogDir].forEach((dir) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    const today = new Date().toISOString().split("T")[0];

    const appLogFile = path.join(appLogDir, `${today}.app.log`);
    const requestLogFile = path.join(requestLogDir, `${today}.request.log`);

    const createTransport = (destination: string, isAppLogger: boolean = false) => {
      const targets: TransportTargetOptions[] = [
        {
          target: "pino/file",
          level: "debug",
          options: {
            destination,
            mkdir: true
          }
        }
      ];

      if (enableConsoleLogs && isAppLogger) {
        targets.push({
          target: "pino-pretty",
          level: "debug",
          options: {
            colorize: true,
            ignore: "pid,hostname"
          }
        });
      }

      return pino.transport({ targets });
    };

    const baseConfig = {
      level: "debug",
      base: undefined,
      timestamp: () => {
        const time = new Date().toLocaleTimeString("en-GB", {
          hour12: false
        });
        return `,"time":"${time}"`;
      }
    };

    this.appLogger = pino(baseConfig, createTransport(appLogFile, true));
    this.requestLogger = pino(baseConfig, createTransport(requestLogFile, false));
  }

  // APP LOGS
  log(message: any, context?: string) {
    const ignoredContexts = ["RouterExplorer", "RoutesResolver", "NestApplication"];

    if (context && ignoredContexts.includes(context)) {
      return;
    }
    this.appLogger.info({ context }, message);
  }

  error(message: any, trace?: string, context?: string) {
    this.appLogger.error({ context, trace }, message);
  }

  warn(message: any, context?: string) {
    this.appLogger.warn({ context }, message);
  }

  debug(message: any, context?: string) {
    this.appLogger.debug({ context }, message);
  }

  verbose(message: any, context?: string) {
    this.appLogger.trace({ context }, message);
  }

  // REQUESTS LOGS
  request(data: any) {
    this.requestLogger.info(data);
  }
}
