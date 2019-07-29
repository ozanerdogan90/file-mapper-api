// tslint:disable-next-line:no-var-requires
const { User } = require('../../src/components/User/model');
import * as bcrypt from 'bcrypt';

const userFindSpy = jest.spyOn(User, 'findOne');
const userCreateSpy = jest.spyOn(User, 'create');

const salt = bcrypt.genSaltSync();
const saltedPassword = bcrypt.hashSync('11223344', salt);
const user = {
    email: 'aa@bb.com',
    password: saltedPassword,
    name: 'test'
};

export function mockDb() {
    userFindSpy.mockImplementation(() =>
        Promise.resolve(user)
    );

    userCreateSpy.mockImplementation(() => Promise.resolve(user));
}

export function resetMock() {
    userFindSpy.mockReset();
    userCreateSpy.mockReset();
}
