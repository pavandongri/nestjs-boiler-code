import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppLogger } from "./core/logger/logger.service";

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: AppLogger
  ) {}

  getHello(): object {
    const DB_URL = this.config.get("DB_URL");
    const BASE_URL = this.config.get("BASE_URL");

    this.logger.log(`DB_URL: ${DB_URL}`);
    this.logger.log(`BASE_URL: ${BASE_URL}`);

    return { message: "Hello World!" };
  }
}
