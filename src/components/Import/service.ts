import { UploadedFile } from 'express-fileupload';
import xlsx from 'node-xlsx';
import { AppError } from '../../types/error/app-error';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import { IColumnMapping } from '../Mapping/model';
import * as mappingService from '../Mapping/service';

export async function extractFile(file: UploadedFile, mappingName: string) {
  const mapping = await mappingService.get(mappingName);
  if (!mapping) {
    throw new AppError('MappingNotFound', HttpStatusCodes.BadRequest);
  }

  // tslint:disable-next-line: no-any
  const data: Array<[]> = xlsx.parse(file.data)[0].data;
  const headerRow = data[mapping.headerRow - 1];
  checkHeaders(headerRow, mapping.columnMappings);
  const rows = data.slice(mapping.startRow - 1);

  return mapRows(headerRow, rows, mapping.columnMappings);
}

function checkHeaders(headerRow: string[], columns: IColumnMapping[]) {
  const difference = columns.filter(x => x.isMandatory && headerRow.findIndex(y => y === x.from) === -1);
  if (difference.length > 0) {
    throw new AppError('MissingMandatoryColumns', HttpStatusCodes.BadRequest, 'Mandatory columns are missing');
  }
}

function mapRows(headerRows: string[], rows: Array<[]>, columns: IColumnMapping[]) {
  if (!rows) {
    throw new AppError('EmptyFile', HttpStatusCodes.BadRequest, 'No row has found');
  }
  // tslint:disable-next-line: no-any
  const map = [];

  for (const column of columns) {

    const from = column.from;
    const columnIndex = headerRows.findIndex(x => column.from === x);
    if (columnIndex !== -1) {
      for (let k = 0; k < rows.length; k++) {
        map[k] = { [from]: rows[k][columnIndex] };
      }
    }
  }

  return map;
}
