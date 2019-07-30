import { Request, Response } from 'express';
import * as Joi from 'joi';
import { HttpStatusCodes } from '../../types/http/http-status-code';
import * as service from './service';

export async function generateToken(
  req: Request,
  res: Response
): Promise<void> {
  const token = await service.generateToken(req.body.email, req.body.password);
  res.status(HttpStatusCodes.OK).json(token);
}

export async function register(req: Request, res: Response) {
  const user = await service.create(
    req.body.email,
    req.body.password,
    req.body.name
  );
  if (!user) {
    return res.status(HttpStatusCodes.NotFound).end();
  }

  res.status(HttpStatusCodes.OK).json(user.email);
}
const defaulMaxLength = 255;
const defaultMinPasswordLength = 8;
const defaultMaxPasswordLength = 16;
export const generateTokenSchema = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(defaultMinPasswordLength)
      .max(defaulMaxLength)
      .required()
  }
};

export const registerSchema = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(defaultMinPasswordLength)
      .max(defaulMaxLength)
      .required(),
    name: Joi.string()
      .min(1)
      .max(defaulMaxLength)
      .required()
  }
};
