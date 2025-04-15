import { NotFoundError, UnauthorizedError, ForbiddenError, ConflictError, BadRequestError, InternalServerError, ValidatorError, DatabaseConnectionError } from "../utils/customError.js";
import HttpRes from "../utils/httpResponse.js";

export const handlerError = ( error, req, res, next ) => {
    if (error instanceof UnauthorizedError) return HttpRes.Unauthorized(res, error);
    if (error instanceof NotFoundError) return HttpRes.NotFound(res, error);
    if (error instanceof ForbiddenError) return HttpRes.Forbidden(res, error);
    if (error instanceof ConflictError) return HttpRes.Conflict(res, error);
    if (error instanceof BadRequestError) return HttpRes.BadRequest(res, error);
    if (error instanceof InternalServerError) return HttpRes.ServerError(res, error);
    if (error instanceof DatabaseConnectionError) return HttpRes.DatabaseError(res, error);
    if (error instanceof ValidatorError) return HttpRes.BadRequest(res, error);
    return HttpRes.ServerError(res, error)
};