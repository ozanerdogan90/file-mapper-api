import { Request, Response } from 'express';
import * as Joi from 'joi';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import { IMapping } from './model';
import * as service from './service';
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise < void >}
 */
export async function create(
    req: Request,
    res: Response,
): Promise<void> {
    const model = req.body as IMapping;
    const result = await service.create(model);
    res.status(HttpStatusCodes.Created).json(result);
}

export async function update(req: Request,
    res: Response,
): Promise<void> {
    const model = req.body as IMapping;
    const name = req.params.name;
    const result = await service.update(name, model);
    res.status(HttpStatusCodes.OK).json(result);
}

export async function remove(req: Request,
    res: Response,
): Promise<void> {
    await service.remove(req.params.name);
    res.status(HttpStatusCodes.OK).end();
}


const columnMappingSchema = Joi.object().keys({
    from: Joi.string().required(),
    to: Joi.string().required(),
    isMandatory: Joi.boolean().required()
})

const maxOwnerName = 10;
export const createSchema = {
    body: {
        name: Joi.string().required(),
        owner: Joi.string().max(maxOwnerName).required(),
        fileType: Joi.string().valid('csv', 'excel'),
        headerRow: Joi.number().required(),
        startRow: Joi.number().required(),
        columnMappings: Joi.array().items(columnMappingSchema)
    },
}

export const nameBasedSchema = {
    params: {
        name: Joi.string().required()
    }
}

export const updateSchema = {
    ...createSchema, ...nameBasedSchema
}
