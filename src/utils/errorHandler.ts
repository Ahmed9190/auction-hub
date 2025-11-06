import { ENV } from '../constants/env';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', 400, context);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network error') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

/**
 * Handle errors with logging and user-friendly messages
 */
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    logError(error);
    return error;
  }

  if (error instanceof TypeError) {
    const appError = new AppError(
      'An unexpected error occurred',
      'TYPE_ERROR',
      500,
      { originalError: error.message }
    );
    logError(appError);
    return appError;
  }

  const appError = new AppError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    500,
    { originalError: String(error) }
  );
  logError(appError);
  return appError;
};

/**
 * Log errors to console and external service
 */
export const logError = (error: AppError) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    context: error.context,
    stack: error.stack,
    environment: ENV.ENVIRONMENT,
  };

  if (ENV.IS_DEV) {
    console.error('🔴 Error:', errorLog);
  }

  if (ENV.FEATURES.ENABLE_ERROR_REPORTING && ENV.IS_PROD) {
    // Send to error tracking service (Sentry, etc.)
    // reportToErrorService(errorLog);
  }
};

/**
 * Get user-friendly error message
 */
export const getUserFriendlyMessage = (error: AppError): string => {
  const messages: Record<string, string> = {
    VALIDATION_ERROR: 'بيانات غير صحيحة. يرجى التحقق من المدخلات.',
    NOT_FOUND: 'العنصر المطلوب غير موجود.',
    UNAUTHORIZED: 'يجب تسجيل الدخول أولاً.',
    NETWORK_ERROR: 'خطأ في الاتصال. يرجى المحاولة لاحقاً.',
    UNKNOWN_ERROR: 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.',
  };

  return messages[error.code] || error.message;
};