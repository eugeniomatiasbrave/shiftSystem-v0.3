export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound Error";
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized Error";
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "Forbidden Error";
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequest Error";
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "Conflict Error";
  }
}

export class DatabaseConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "Database Connection Error";
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Internal Server Error";
  }
}

export class ValidatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "Validator Error";
  }
}
