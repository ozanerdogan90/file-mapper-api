import { Request, Response } from 'express';
import * as Joi from 'joi';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
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
const defaultMinPassword = 8;
const defaultMaxPassword = 16;
export const generateTokenSchema = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(defaultMinPassword)
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
      .min(defaultMinPassword)
      .max(defaultMaxPassword)
      .required(),
    name: Joi.string()
      .min(1)
      .max(defaulMaxLength)
      .required()
  }
};
