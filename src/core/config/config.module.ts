import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      cache: true,
      expandVariables: true,
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
