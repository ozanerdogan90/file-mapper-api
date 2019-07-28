import { UploadedFile } from 'express-fileupload';
import * as TypeMoq from 'typemoq';
import { AppError } from '../../types/error/app-error';
import * as service from './service';
// tslint:disable:no-var-requires
const { Mapping } = require('../Mapping/model');
const xlsx = require('node-xlsx');

// tslint:disable: deprecation
// tslint:disable:no-magic-numbers
describe('/import service', () => {
  describe('/import', () => {
    test('invalid file type should throw error', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMINVALID.txt');

      try {
        await service.extractFile(fileMock.object, 'fileName');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
        expect(error.name).toBe('InvalidFileExtension');
      }
    });
    test('not found mapping should throw error', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      try {
        await service.extractFile(fileMock.object, 'fileName');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
        expect(error.name).toBe('MappingNotFound');
      }
    });

    test('empty file should throw error', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      fileMock.setup(x => x.data).returns(() => new Buffer(''));

      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve({}));

      jest.spyOn(xlsx, 'parse').mockImplementation(() => Promise.resolve([[]]));

      try {
        await service.extractFile(fileMock.object, 'fileName');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
        expect(error.name).toBe('EmptyFile');
      }
    });

    test('missing column should throw error', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      fileMock.setup(x => x.data).returns(() => Buffer.from('A\nEUR1\nEUR2'));

      const mapping = {
        headerRow: 1,
        columnMappings: [{ from: 'B', isMandatory: true }]
      };

      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve(mapping));

      try {
        await service.extractFile(fileMock.object, 'fileName');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
        expect(error.name).toBe('MissingMandatoryColumns');
      }
    });

    test('no content in file should throw error', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      fileMock.setup(x => x.data).returns(() => Buffer.from('A\nEUR1\nEUR2'));
      const mapping = {
        headerRow: 1,
        startRow: 2,
        columnMappings: [{ from: 'A' }]
      };

      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve(mapping));

      try {
        await service.extractFile(fileMock.object, 'fileName');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
        expect(error.name).toBe('EmptyContext');
      }
    });

    test('success should extract eur from text', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      fileMock.setup(x => x.data).returns(() => Buffer.from('A\nEUR1\nEUR2'));

      const mapping = {
        headerRow: 1,
        startRow: 2,
        columnMappings: [
          {
            from: 'A',
            to: 'newA',
            fieldTransformations: [
              {
                extractRegex: '(?:EUR|[$])s*'
              }
            ]
          }
        ]
      };

      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve(mapping));
      const expected = await service.extractFile(fileMock.object, 'fileName');
      expect(expected).toHaveLength(2);
      expect(expected[0].newA).toBe('EUR');
    });
    test('success should replace eur from text', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      fileMock.setup(x => x.data).returns(() => Buffer.from('A\nEUR1\nEUR2'));

      const mapping = {
        headerRow: 1,
        startRow: 2,
        columnMappings: [
          {
            from: 'A',
            to: 'newA',
            fieldTransformations: [
              {
                extractRegex: '(?:EUR|[$])s*',
                replaceRegex: 'notEur'
              }
            ]
          }
        ]
      };

      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve(mapping));

      const expected = await service.extractFile(fileMock.object, 'fileName');
      expect(expected).toHaveLength(2);
      expect(expected[0].newA).toBe('notEur');
    });
    test('success should ignore from text', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      fileMock.setup(x => x.data).returns(() => Buffer.from('A\nEUR1\nEUR2'));

      const mapping = {
        headerRow: 1,
        startRow: 2,
        columnMappings: [
          {
            from: 'A',
            to: 'newA',
            fieldTransformations: [
              {
                extractRegex: '(?:EUR|[$])s*',
                ignoreRegex: true
              }
            ]
          }
        ]
      };

      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve(mapping));

      const expected = await service.extractFile(fileMock.object, 'fileName');
      expect(expected).toHaveLength(2);
      expect(expected[0].newA).toBe('');
    });

    test('success should multiply value', async () => {
      const fileMock: TypeMoq.IMock<UploadedFile> = TypeMoq.Mock.ofType<
        UploadedFile
      >();
      fileMock.setup(x => x.name).returns(() => 'IAMVALID.csv');
      fileMock.setup(x => x.data).returns(() => Buffer.from('A\n10\n20'));

      const mapping = {
        headerRow: 1,
        startRow: 2,
        columnMappings: [
          {
            from: 'A',
            to: 'newA',
            fieldTransformations: [
              {
                multiplyValue: 10
              }
            ]
          }
        ]
      };

      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve(mapping));
      const expected = await service.extractFile(fileMock.object, 'fileName');
      expect(expected).toHaveLength(2);
      expect(expected[0].newA).toBe('100');
    });
  });
});
