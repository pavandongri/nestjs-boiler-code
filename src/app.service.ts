import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './core/logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: AppLogger,
  ) {}

  getHello(): object {
    const dbUrl = this.config.get('DB_URL');

    this.logger.log(`DB_URL: ${dbUrl}`);

    return { message: 'Hello World!' };
  }
}
