import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AppLogger } from "../logger/logger.service";

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();

    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();

    const start = Date.now();
    const requestId = randomUUID();

    const { method, url, query, params, body, ip } = request;

    const logBase = { requestId, method, url, query, params, body, ip };

    const getResponseTime = () => `${Date.now() - start}ms`;

    return next.handle().pipe(
      tap(() => {
        this.logger.request({
          ...logBase,
          statusCode: reply.statusCode,
          success: reply.statusCode < 400,
          error: null,
          responseTime: getResponseTime()
        });
      }),

      catchError((error) => {
        const statusCode = error?.statusCode || error?.status || 500;

        this.logger.request({
          ...logBase,
          statusCode,
          success: false,
          error: error.message,
          responseTime: getResponseTime()
        });

        return throwError(() => error);
      })
    );
  }
}
