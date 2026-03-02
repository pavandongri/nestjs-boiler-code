import { Injectable, LoggerService } from '@nestjs/common';
import pino, { Logger } from 'pino';

@Injectable()
export class AppLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    const isProd = process.env.NODE_ENV === 'production';

    this.logger = pino({
      level: isProd ? 'info' : 'debug',
      transport: !isProd
        ? {
            target: 'pino-pretty',
            options: { colorize: true },
          }
        : undefined,
    });
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
