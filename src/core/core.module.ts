import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { AppConfigModule } from './config/config.module';

@Global()
@Module({
  imports: [AppConfigModule, LoggerModule],
  exports: [AppConfigModule, LoggerModule],
})
export class CoreModule {}
