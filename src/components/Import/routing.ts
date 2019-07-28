import { controller } from '.';
import { IEndpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: IEndpoint[] = [
    {
        method: Method.Post,
        route: '/imports/:name',
        schema: controller.nameBasedSchema,
        action: controller.importFile,
        description: 'Import a file',
    }
];

export default endpoints;
