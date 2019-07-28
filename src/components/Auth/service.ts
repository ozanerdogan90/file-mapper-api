import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Config } from '../../config/env';
import { AppError } from '../../types/error/app-error';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import { User } from '../User/model';

export async function generateToken(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(
      'InvalidUser',
      HttpStatusCodes.BadRequest,
      'No user found'
    );
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError(
      'InvalidCredential',
      HttpStatusCodes.BadRequest,
      'Invalid Credential'
    );
  }

  return jwt.sign({ email, password }, Config.secret, {
    expiresIn: Config.tokenTime
  });
}

export async function create(email: string, password: string, name: string) {
  return User.create({ email, password, name });
}

export async function remove(email: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(
      'InvalidUser',
      HttpStatusCodes.NotFound,
      'No user found, email :' + email
    );
  }

  return User.remove(user);
}
