import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { IValidationSchema } from '../types/endpoint/endpoint';
import { AppError } from '../types/error/app-error';
import { errorFormatter } from '../types/error/error-formatter';
import { HttpStatusCodes } from '../types/http/HttpStatusCodes';

export function validationMiddleware(schema: IValidationSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { body, params, query } = schema;
        const validationOptions = {
            stripUnknown: true,
        };

        if (body) {
            const result: Joi.ValidationResult<object> = Joi.validate<object>(req.body, body, validationOptions);
            if (result.error) {
                throw new AppError('Error in body parameters.', HttpStatusCodes.BadRequest, JSON.stringify(errorFormatter(result.error)));
            }
            req.body = result.value;
        }
        if (params) {
            const result: Joi.ValidationResult<object> = Joi.validate<object>(req.params, params, validationOptions);
            if (result.error) {
                throw new AppError('Error in parameters.', HttpStatusCodes.BadRequest, JSON.stringify(errorFormatter(result.error)));
            }
            req.params = result.value;
        }
        if (query) {
            const result: Joi.ValidationResult<object> = Joi.validate<object>(req.query, query, validationOptions);
            if (result.error) {
                throw new AppError('Error in query.', HttpStatusCodes.BadRequest, JSON.stringify(errorFormatter(result.error)));
            }
            req.query = result.value;
        }
        next();
    };
}
