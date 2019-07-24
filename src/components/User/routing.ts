import { UserComponent } from '..';
import { Endpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: Endpoint[] = [
    {
        method: Method.Get,
        route: 'users/:id',
        schema: UserComponent.singleUserSchema,
        action: UserComponent.findOne,
        description: 'Get user by id',
    },
    {
        method: Method.Post,
        route: 'user',
        schema: UserComponent.createUserSchema,
        action: UserComponent.create,
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
        route: 'users/:id',
        action: UserComponent.remove,
        schema: UserComponent.singleUserSchema,
        description: 'Delete user by id',
    }
];

export default endpoints;
