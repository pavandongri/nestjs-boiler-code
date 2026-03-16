import { Global, Module } from "@nestjs/common";
import { LoggerModule } from "./logger/logger.module";
import { AppConfigModule } from "./config/config.module";
import { DatabaseModule } from "./db/database.module";
import { ProviderModule } from "../modules/providers/provider.module";

@Global()
@Module({
  imports: [AppConfigModule, LoggerModule, DatabaseModule, ProviderModule],
  exports: [AppConfigModule, LoggerModule, DatabaseModule, ProviderModule]
})
export class CoreModule {}
