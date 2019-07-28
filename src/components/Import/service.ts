import { UploadedFile } from 'express-fileupload';
import xlsx from 'node-xlsx';
import * as path from 'path';
import { AppError } from '../../types/error/app-error';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import logger from '../../types/logger/logger';
import { IColumnMapping, IFieldTransformation } from '../Mapping/model';
import * as mappingService from '../Mapping/service';
import { Config } from './../../config/env';

export async function extractFile(file: UploadedFile, mappingName: string) {
  if (
    Config.allowedExtensions.findIndex(x => x === path.extname(file.name)) ===
    -1
  ) {
    throw new AppError('InvalidFileExtension', HttpStatusCodes.BadRequest);
  }

  const mapping = await mappingService.get(mappingName);
  if (!mapping) {
    throw new AppError('MappingNotFound', HttpStatusCodes.BadRequest);
  }
  // tslint:disable-next-line: no-any
  const data: Array<[]> = xlsx.parse(file.data)[0].data;

  if (!data || data.length === 0) {
    throw new AppError('EmptyFile', HttpStatusCodes.BadRequest);
  }

  const headerRow = data[mapping.headerRow - 1];
  checkColumns(headerRow, mapping.columnMappings);
  const rows = data.slice(mapping.startRow - 1);

  return mapRows(headerRow, rows, mapping.columnMappings);
}

function checkColumns(headerRow: string[], columns: IColumnMapping[]) {
  const difference = columns.filter(
    x => x.isMandatory && headerRow.findIndex(y => y === x.from) === -1
  );
  if (difference.length > 0) {
    throw new AppError(
      'MissingMandatoryColumns',
      HttpStatusCodes.BadRequest,
      'Mandatory columns are missing'
    );
  }
}

function mapRows(
  headerRows: string[],
  rows: Array<[]>,
  columns: IColumnMapping[]
) {
  if (!rows) {
    throw new AppError(
      'EmptyContext',
      HttpStatusCodes.BadRequest,
      'No row has found'
    );
  }
  // tslint:disable-next-line: no-any
  const map = [];

  for (const column of columns) {
    const columnIndex = headerRows.findIndex(x => column.from === x);
    if (columnIndex !== -1) {
      for (let k = 0; k < rows.length; k++) {
        map[k] = {
          [column.to]: applyfieldTransformations(
            rows[k][columnIndex],
            column.fieldTransformations
          )
        };
      }
    }
  }

  return map;
}

function applyfieldTransformations(
  value: string,
  fieldTransformations: IFieldTransformation[]
) {
  if (!fieldTransformations || fieldTransformations.length === 0) {
    return value;
  }

  let result = value;
  try {
    for (const fieldTransformation of fieldTransformations) {
      result = applyExtractRegex(result, fieldTransformation);
      result = applyReplaceRegex(result, fieldTransformation);
      result = applyIgnoreRegex(result, fieldTransformation);
      result = applyMultiplyValue(result, fieldTransformation);
    }
  } catch (error) {
    logger.error(error.message);

    return result;
  }

  return result;
}

function applyExtractRegex(
  value: string,
  fieldTransformation: IFieldTransformation
): string {
  if (
    fieldTransformation.extractRegex &&
    !fieldTransformation.replaceRegex &&
    !fieldTransformation.ignoreRegex
  ) {
    const match = value.match(fieldTransformation.extractRegex);
    if (match && match.length > 0) {
      return match[0];
    }
  }

  return value;
}

function applyReplaceRegex(
  value: string,
  fieldTransformation: IFieldTransformation
): string {
  if (fieldTransformation.extractRegex && fieldTransformation.replaceRegex) {
    const match = value.match(fieldTransformation.extractRegex);
    if (match && match.length > 0) {
      const extractedValue = match[0];

      return extractedValue.replace(
        extractedValue,
        fieldTransformation.replaceRegex
      );
    }
  }

  return value;
}

function applyIgnoreRegex(
  value: string,
  fieldTransformation: IFieldTransformation
): string {
  if (fieldTransformation.extractRegex && fieldTransformation.ignoreRegex) {
    const match = value.match(fieldTransformation.extractRegex);
    if (match && match.length > 0) {
      const extractedValue = match[0];

      return extractedValue.replace(extractedValue, '');
    }
  }

  return value;
}

function applyMultiplyValue(
  value: string,
  fieldTransformation: IFieldTransformation
): string {
  if (fieldTransformation.multiplyValue) {
    return (parseFloat(value) * fieldTransformation.multiplyValue).toString();
  }

  return value;
}
