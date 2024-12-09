/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export const httpErrorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
    return;
  }

  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: string[] = [];

  if (err.message && err.message.includes('[')) {
    const [errorCode, errorMessage] = err.message.split('] ');
    statusCode = 400;
    message = errorMessage || err.message;
    errors = [errorCode.replace('[', '')];
  } else if (err.status && err.message) {
    statusCode = err.status;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = err?.fields || [];
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid Data';
  }

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json({
    message,
    errors,
  });
};
