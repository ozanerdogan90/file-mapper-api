import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../components/User/model';
import { Config } from '../config/env';
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
    const token = getToken(request);

    if (token) {
        // tslint:disable-next-line: no-any
        const decoded: any = await jwt.verify(token, Config.secret);
        if (!decoded) return response.status(HttpStatusCodes.Unauthorized).end();
        const user = await User.findOne({ 'email': decoded.email });
        if (!user) return response.status(HttpStatusCodes.Unauthorized).end();
        if (!bcrypt.compareSync(decoded.password, user.password)) {
            return response.status(HttpStatusCodes.Unauthorized).end();
        }
        next();
    } else {
        return response.status(HttpStatusCodes.Unauthorized).end();
    }
}
