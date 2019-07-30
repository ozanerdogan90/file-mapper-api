import { controller } from '.';
import { IEndpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: IEndpoint[] = [
  {
    method: Method.Get,
    route: '/users/:email',
    schema: controller.singleUserSchema,
    action: controller.findOne,
    description: 'Get user by email'
  },
  {
    method: Method.Post,
    route: '/users',
    schema: controller.createUserSchema,
    action: controller.create,
    description: 'Create a new user'
  },
  {
    method: Method.Get,
    route: '/users',
    action: controller.findAll,
    description: 'Get list of users'
  },
  {
    method: Method.Delete,
    route: '/users/:email',
    action: controller.remove,
    schema: controller.singleUserSchema,
    description: 'Delete user by email'
  }
];

export default endpoints;
