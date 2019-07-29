import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { HttpStatusCodes } from '../../src/types/http/HttpStatusCodes';
import * as dbHelper from '../helpers/database';

chai.use(chaiHttp);
describe('Auth Service', () => {
    beforeAll(() => {
        dbHelper.mockDb();
    });

    afterAll(() => {
        dbHelper.resetMock();
    });
    describe('Authorization', () => {
        test('empty header should return unauthorized', async () => {
            const expected = await chai.request(app).
                post('/users').
                send({
                    email: 'IAMNOTEMAIL'
                });

            expect(expected.status).toBe(HttpStatusCodes.Unauthorized);
        });
        test('invalid http should return bad request', async () => {
            const expected = await chai.request(app).
                post('/users').
                set('Authorization', 'IAMINVALID').
                send({
                    email: 'aa@bb.com',
                    password: '1'
                });

            expect(expected.status).toBe(HttpStatusCodes.Unauthorized);

        });

        test('success', async () => {
            const auth = await chai.request(app).
                post('/auth').
                set('Authorization', 'IAMINVALID').
                send({
                    email: 'aa@bb.com',
                    password: '11223344'
                });

            const expected = await chai.request(app)
                .post('/users').
                set('Authorization', 'Bearer ' + auth.body).
                send({
                    email: 'aa@bb.com',
                    password: '11223344',
                    name: 'IAMNAME'
                });


            expect(expected.status).toBe(HttpStatusCodes.Created);

        });
    });
});
