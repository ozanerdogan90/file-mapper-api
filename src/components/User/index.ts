import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import * as service from './service';
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
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
  try {
    const user: IUserModel = await UserService.insert(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
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
  try {
    const user: IUserModel = await UserService.remove(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export const singleUserSchema = {
  params: {
    id: Joi.string().guid({
      version: [
        'uuidv4'
      ]
    }).required()
  },
}

export const createUserSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(1).max(255).required(),
    name: Joi.string().min(1).max(255).required(),
    gender: Joi.string().max(1).required(),
    birthday: Joi.date().required()
  },
}
