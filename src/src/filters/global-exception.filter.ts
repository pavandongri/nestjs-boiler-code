import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { APP_CONSTANTS } from "src/constants/app.contants";
import { AppLogger } from "src/core/logger/logger.service";

import { ApiError } from "src/utils/api-error";
import { ErrorApiResponse } from "src/utils/api-response";

const isProd = process.env.NODE_ENV === APP_CONSTANTS.PRODUCTION;

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const reply = ctx.getResponse<FastifyReply>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = "internal_server_error";
    let message = "Internal Server Error";
    let stack: string | undefined = undefined;

    if (exception instanceof ApiError) {
      statusCode = exception.statusCode;
      errorCode = exception.errorCode;
      message = exception.message;
      stack = exception.stack;
    } else if (exception instanceof Error && !isProd) {
      message = exception.message;
      stack = exception.stack;
    }

    if (isProd) stack = undefined;

    this.logger.error(
      {
        message,
        method: request.method,
        url: request.url,
        body: request.body
      },
      stack
    );

    const response = ErrorApiResponse(message, errorCode, stack);

    reply.status(statusCode).send(response);
  }
}
