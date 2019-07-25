import { UserComponent } from '..';
import { IEndpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: IEndpoint[] = [
    {
        method: Method.Get,
        route: '/users/:email',
        schema: UserComponent.singleUserSchema,
        action: UserComponent.findOne,
        description: 'Get user by id',
    },
    {
        method: Method.Post,
        route: '/users',
        schema: UserComponent.createUserSchema,
        action: UserComponent.create,
        auth: false,
        description: 'Create a new user',
    },
    {
        method: Method.Get,
        route: '/users',
        action: UserComponent.findAll,
        description: 'Get list of users',
    },
    {
        method: Method.Delete,
        route: '/users/:id',
        action: UserComponent.remove,
        schema: UserComponent.singleUserSchema,
        description: 'Delete user by id',
    }
];

export default endpoints;
