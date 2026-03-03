import { Injectable } from "@nestjs/common";
import { AppLogger } from "./core/logger/logger.service";

@Injectable()
export class AppService {
  constructor(private readonly logger: AppLogger) {}

  getHello(): object {
    this.logger.log("Log Inside Hello World");

    this.logger.error(`Error Inside Hello World`);

    return { message: "Hello World!" };
  }
}
