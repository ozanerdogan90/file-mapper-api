import { AppError } from '../../types/error/app-error';
import * as service from './service';
// tslint:disable:no-var-requires
const { User } = require('../User/model');

describe('/user service', () => {
  describe('/create', () => {
    test('success', async () => {
      jest.spyOn(User, 'create').mockImplementation(() => Promise.resolve({}));
      await service.create('', '', '');
    });
  });

  describe('/remove', () => {
    test('success', async () => {
      jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve({}));
      jest.spyOn(User, 'remove').mockImplementation(() => Promise.resolve({}));
      await service.remove('');
    });
    test('invalid user throws error', async () => {
      jest
        .spyOn(User, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      try {
        await service.remove('');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
      }
    });
  });

  describe('/find', () => {
    jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve({}));
  });

  describe('/findAll', () => {
    jest.spyOn(User, 'find').mockImplementation(() => Promise.resolve({}));
  });
});
