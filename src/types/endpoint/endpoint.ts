import { NextFunction, Request, Response } from 'express';

export enum Method {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Patch = 'patch',
    Delete = 'delete',
}

export interface ValidationSchema {
    body?: object;
    params?: object;
    query?: object;
}

export interface Endpoint {
    method: Method;
    route: string;
    action: Action;
    auth?: boolean; // false: disable authentication for this route.
    schema?: ValidationSchema; // for validating POST routes' fields
    description?: string; // for swagger
}

export type Action = (req: Request, res: Response, next: NextFunction) => any;