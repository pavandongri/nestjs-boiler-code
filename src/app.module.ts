import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from "./core/core.module";
import { DatabaseModule } from "./core/db/database.module";
import { ProviderModule } from "./modules/providers/provider.module";

@Module({
  imports: [CoreModule, DatabaseModule, ProviderModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
