import { controller } from '.';
import { IEndpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: IEndpoint[] = [
  {
    method: Method.Post,
    route: '/auth',
    schema: controller.generateTokenSchema,
    action: controller.generateToken,
    auth: false,
    description: 'Generate token via email adress and password'
  },
  {
    method: Method.Post,
    route: '/register',
    schema: controller.registerSchema,
    action: controller.register,
    auth: false,
    description: 'Register a new user'
  }
];

export default endpoints;
