import { ERROR_STATUS_MAP, ErrorCode } from "src/common/constants/error.constants";

export class ApiError extends Error {
  statusCode: number;
  errorCode: ErrorCode;
  details?: any;

  constructor(errorCode: ErrorCode, message: string, details?: any) {
    super(message);

    this.errorCode = errorCode;
    this.statusCode = ERROR_STATUS_MAP[errorCode] || 500;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
