import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from "./core/core.module";
import { GlobalExceptionFilter } from "./src/filters/global-exception.filter";

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ]
})
export class AppModule {}
