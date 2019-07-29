import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { HttpStatusCodes } from '../../src/types/http/http-status-code';
import * as dbHelper from '../helpers/database';

chai.use(chaiHttp);
describe('Auth Service', () => {
  beforeAll(() => {
    dbHelper.mockDb();
  });

  afterAll(() => {
    dbHelper.resetMock();
  });
  describe('POST auth', () => {
    test('invalid email should return bad request', async () => {
      const expected = await chai.request(app).
        post('/auth').
        send({
          email: 'IAMNOTEMAIL'
        });

      expect(expected.status).toBe(HttpStatusCodes.BadRequest);
    });
    test('invalid password should return bad request', async () => {
      const expected = await chai.request(app).
        post('/auth').
        send({
          email: 'aa@bb.com',
          password: '1'
        });

      expect(expected.status).toBe(HttpStatusCodes.BadRequest);

    });
    test('success should return token', async () => {
      const expected = await chai.request(app).
        post('/auth').
        send({
          email: 'aa@bb.com',
          password: '11223344'
        });

      expect(expected.status).toBe(HttpStatusCodes.OK);
      expect(expected.body).not.toBeUndefined();
    });
  });
  describe('POST register', () => {
    test('invalid email should return bad request', async () => {
      const expected = await chai.request(app).
        post('/register').
        send({
          email: 'IAMNOTEMAIL'
        });

      expect(expected.status).toBe(HttpStatusCodes.BadRequest);
    });
    test('invalid password should return bad request', async () => {
      const expected = await chai.request(app).
        post('/register').
        send({
          email: 'aa@bb.com',
          password: '1'
        });

      expect(expected.status).toBe(HttpStatusCodes.BadRequest);
    });
    test('invalid name should return bad request', async () => {
      const expected = await chai.request(app).
        post('/register').
        send({
          email: 'aa@bb.com',
          password: '11223344'
        });

      expect(expected.status).toBe(HttpStatusCodes.BadRequest);
    });
    test('success should return user email', async () => {
      const expected = await chai.request(app).
        post('/register').
        send({
          email: 'aa@bb.com',
          password: '11223344',
          name: 'IAMNAME'
        });

      expect(expected.status).toBe(HttpStatusCodes.OK);
      expect(expected.body).toBe('aa@bb.com')
    });
  });
});
