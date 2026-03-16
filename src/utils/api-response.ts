export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: any;
  timestamp: string;
}

export function SuccessApiResponse<T = any>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

export function ErrorApiResponse(message: string, error?: string, details?: any): ApiResponse {
  return {
    success: false,
    message,
    error,
    details,
    timestamp: new Date().toISOString()
  };
}
