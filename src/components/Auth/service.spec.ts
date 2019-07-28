import { AppError } from '../../types/error/app-error';
import * as service from './service';
// tslint:disable:no-var-requires
const { User } = require('../User/model');
const bcrypt = require('bcrypt');

describe('/auth service', () => {
  describe('/generateToken', () => {
    test('success', async () => {
      const user = { email: 'aa@bb.com', password: '112233', name: 'test' };
      jest
        .spyOn(User, 'findOne')
        .mockImplementation(() => Promise.resolve(user));
      jest
        .spyOn(bcrypt, 'compareSync')
        .mockImplementation(() => Promise.resolve(true));
      const result = await service.generateToken(user.email, user.password);
      expect(result).not.toBe(undefined);
    });

    test('Undefined user should throw error', async () => {
      jest
        .spyOn(User, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      try {
        await service.generateToken('', '');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
      }
    });

    test('Invalid password should throw error', async () => {
      jest.spyOn(User, 'findOne').mockImplementation(() =>
        Promise.resolve({
          email: 'aa@bb.com',
          password: '112233',
          name: 'test'
        })
      );
      jest
        .spyOn(bcrypt, 'compareSync')
        .mockImplementation(() => Promise.resolve(false));
      try {
        await service.generateToken('aa@bb.com', '112233');
      } catch (error) {
        expect(error).not.toBe(undefined);
        expect(error).toBeInstanceOf(AppError);
      }
    });
  });

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
});
