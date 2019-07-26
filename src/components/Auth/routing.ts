import { AuthComponent } from '..';
import { IEndpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: IEndpoint[] = [
    {
        method: Method.Post,
        route: '/auth',
        schema: AuthComponent.generateTokenSchema,
        action: AuthComponent.generateToken,
        auth: false,
        description: 'Generate token via email adress and password',
    },
    {
        method: Method.Post,
        route: '/register',
        schema: AuthComponent.registerSchema,
        action: AuthComponent.register,
        auth: false,
        description: 'Register a new user',
    }
];

export default endpoints;
