import { Request, Response } from 'express';
import * as Joi from 'joi';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import * as service from './service';
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < void >}
 */
export async function generateToken(
  req: Request,
  res: Response,
): Promise<void> {
  const token = await service.generateToken(req.body.email, req.body.password);
  res.status(HttpStatusCodes.OK).json(token);
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < void >}
 */
export async function register(
  req: Request,
  res: Response
) {

  const user = await service.create(req.body.email, req.body.password, req.body.name);
  if (!user) {
    res.status(HttpStatusCodes.NotFound);

    return;
  }

  res.status(HttpStatusCodes.OK).json(user);
}
const defaulMaxLength = 255;
export const generateTokenSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(1).max(defaulMaxLength).required(),
  },
}

export const registerSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(1).max(defaulMaxLength).required(),
    name: Joi.string().min(1).max(defaulMaxLength).required()
  },
}

