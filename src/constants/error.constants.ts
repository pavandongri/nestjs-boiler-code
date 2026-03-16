export const ERROR_CODES = {
  // 2xx
  OK: "ok",
  CREATED: "created",

  // 4xx
  BAD_REQUEST: "bad_request",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "not_found",
  METHOD_NOT_ALLOWED: "method_not_allowed",
  NOT_ACCEPTABLE: "not_acceptable",
  REQUEST_TIMEOUT: "request_timeout",
  CONFLICT: "conflict",
  GONE: "gone",
  PAYLOAD_TOO_LARGE: "payload_too_large",
  UNSUPPORTED_MEDIA_TYPE: "unsupported_media_type",
  TOO_MANY_REQUESTS: "too_many_requests",

  // 5xx
  INTERNAL_SERVER_ERROR: "internal_server_error",
  NOT_IMPLEMENTED: "not_implemented",
  BAD_GATEWAY: "bad_gateway",
  SERVICE_UNAVAILABLE: "service_unavailable",
  GATEWAY_TIMEOUT: "gateway_timeout"
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const ERROR_STATUS_MAP: Record<ErrorCode, number> = {
  // 2xx
  ok: 200,
  created: 201,

  // 4xx
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  method_not_allowed: 405,
  not_acceptable: 406,
  request_timeout: 408,
  conflict: 409,
  gone: 410,
  payload_too_large: 413,
  unsupported_media_type: 415,
  too_many_requests: 429,

  // 5xx
  internal_server_error: 500,
  not_implemented: 501,
  bad_gateway: 502,
  service_unavailable: 503,
  gateway_timeout: 504
};
