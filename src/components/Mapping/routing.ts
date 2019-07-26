import { controller } from '.';
import { IEndpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: IEndpoint[] = [
    {
        method: Method.Post,
        route: '/mappings',
        schema: controller.createSchema,
        action: controller.create,
        description: 'Creates a new mapping schema',
    }
];

export default endpoints;
