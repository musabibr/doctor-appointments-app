const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class BaseError extends Error {
  constructor(name, statusCode, description) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

class AppError extends Error {
    constructor(name,statusCode,description, isOperational, errorStack, logingErrorResponse){
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}

// 500 Internal Error
class APIError extends BaseError {
  constructor(description = "api error") {
    super(
      "api internal server error",
      STATUS_CODES.INTERNAL_ERROR,
      description
    );
  }
}

// 400 Validation Error
class ValidationError extends BaseError {
  constructor(description = "bad request") {
    super("bad request", STATUS_CODES.BAD_REQUEST, description);
  }
}

// 403 Authorize error
class AuthorizeError extends BaseError {
  constructor(description = "access denied") {
    super("access denied", STATUS_CODES.UN_AUTHORIZED, description);
  }
}

// 404 Not Found
class NotFoundError extends BaseError {
  constructor(description = "not found") {
    super("not found", STATUS_CODES.NOT_FOUND, description);
  }
}
class BadRequestError extends AppError {
  constructor(description = "Bad request", logingErrorResponse) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      logingErrorResponse
    );
  }
}

module.exports = {
  STATUS_CODES,
  AppError,
  APIError,
  ValidationError,
  AuthorizeError,
  NotFoundError,
  BadRequestError,
};
