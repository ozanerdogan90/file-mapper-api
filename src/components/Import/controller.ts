import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as Joi from 'joi';
import { HttpStatusCodes } from '../../types/http/http-status-code';
import * as service from './service';

export async function importFile(req: Request, res: Response): Promise<void> {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(HttpStatusCodes.BadRequest)
      .json('No files were uploaded.')
      .end();
  }
  const file = req.files.importFile as UploadedFile;
  const result = await service.extractFile(file, req.params.name);
  res.status(HttpStatusCodes.Created).json(result);
}

export const nameBasedSchema = {
  params: {
    name: Joi.string().required()
  }
};
