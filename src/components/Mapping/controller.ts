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

    // tslint:disable-next-line: no-console
    console.log('model : ' + JSON.stringify(model));

    const result = await service.create(model);
    res.status(HttpStatusCodes.OK).json(result);
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

