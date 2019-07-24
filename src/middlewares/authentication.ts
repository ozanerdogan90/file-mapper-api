import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UserRepository } from '../components/User/repository';
import { HttpStatusCodes } from '../types/http/HttpStatusCodes';

function getToken(request: Request) {
    const token = request.headers.authorization;
    if (token && token.split(' ')[0] === 'Bearer') {
        return token.split(' ')[1];
    } else {
        return undefined;
    }
}

export async function authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
    const repo = Container.get(UserRepository);
    const token = getToken(request);
    if (token) {
        const encodedData = window.atob(token);
        if (repo.checkUserCredential(encodedData.split(';')[0], encodedData.split(';')[1])) {
            next();
        }
    }

    response.status(HttpStatusCodes.Unauthorized).end();
}
