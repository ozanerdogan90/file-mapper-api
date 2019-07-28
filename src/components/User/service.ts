import { AppError } from '../../types/error/app-error';
import { HttpStatusCodes } from '../../types/http/HttpStatusCodes';
import { User } from './model';

export async function findUser(email: string) {
  return User.findOne({ email });
}

export async function findAll() {
  return User.find({});
}

export async function create(email: string, password: string, name: string) {
  return User.create({ email, password, name });
}

export async function remove(email: string) {
  const user = await this.findUser(email);
  if (!user) {
    throw new AppError(
      'InvalidUser',
      HttpStatusCodes.NotFound,
      'No user found, email :' + email
    );
  }

  return User.remove(user);
}
