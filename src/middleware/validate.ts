import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ValidationError } from "../errors/AppError";

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        for (const issue of err.errors) {
          const key = issue.path.join(".") || "root";
          if (!errors[key]) errors[key] = [];
          errors[key].push(issue.message);
        }
        next(new ValidationError(errors));
      } else {
        next(err);
      }
    }
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        for (const issue of err.errors) {
          const key = issue.path.join(".") || "root";
          if (!errors[key]) errors[key] = [];
          errors[key].push(issue.message);
        }
        next(new ValidationError(errors));
      } else {
        next(err);
      }
    }
  };
}
