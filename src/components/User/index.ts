import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import * as service from './service';
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < void >}
 */
export async function findAll(
  req: Request,
  res: Response,
): Promise<void> {
  const users = await service.findAll();
  res.status(HttpStatusCodes.OK).json(users);
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < void >}
 */
export async function findOne(
  req: Request,
  res: Response
) {

  const user = await service.findUser(req.params.email);
  if (!user) {
    res.status(HttpStatusCodes.NotFound);

    return;
  }

  res.status(HttpStatusCodes.OK).json(user);
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < void >}
 */
export async function create(
  req: Request,
  res: Response
): Promise<void> {

  const user = await service.create(req.body.email, req.body.password, req.body.name);

  res.status(HttpStatusCodes.Created).json(user);
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  await service.remove(req.params.email);
  res.status(HttpStatusCodes.OK);
}

export const singleUserSchema = {
  params: {
    email: Joi.string().email().required()
  },
}

const defaulMaxLength = 255;
export const createUserSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(1).max(defaulMaxLength).required(),
    name: Joi.string().min(1).max(defaulMaxLength).required()
  },
}

