import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/env';
import { AppError } from '../../types/error/app-error';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import User, { IUser } from './model';

export async function check(email: string, password: string) {
  User.findById(email).then(user => {
    if (!user) {
      throw new AppError('Unauthorized', HttpStatusCodes.Unauthorized, 'No user found, email :' + email);
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new AppError('Unauthorized', HttpStatusCodes.Unauthorized, 'No user found, email :' + email);
    }

    return jwt.sign({ id: user._id }, config.secret, {
      expiresIn: config.tokenTime
    });
  }).catch(err => {
    if (err) {
      throw err;
    }
  });
};

export async function findUser(email: string) {
  return User.findById(email).then(user => user).catch(err => {
    if (err) {
      throw err;
    }
  });
};

export async function findAll() {
  return User.find().then(users => users).catch(err => {
    if (err) {
      throw err;
    }
  });
};

export async function add(email: string, password: string, name: string) {
  const user = { email, password: bcrypt.hashSync(password, config.secret), name };

  return User.create(user);
}
