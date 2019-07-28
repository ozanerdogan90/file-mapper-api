import { controller } from '.';
import { IEndpoint, Method } from '../../types/endpoint/endpoint';

const endpoints: IEndpoint[] = [
  {
    method: Method.Post,
    route: '/mappings',
    schema: controller.createSchema,
    action: controller.create,
    description: 'Creates a new mapping schema'
  },
  {
    method: Method.Put,
    route: '/mappings/:name',
    schema: controller.updateSchema,
    action: controller.update,
    description: 'Updates an existing mapping'
  },
  {
    method: Method.Get,
    route: '/mappings/:name',
    schema: controller.nameBasedSchema,
    action: controller.get,
    description: 'Gets a mapping by name'
  },
  {
    method: Method.Delete,
    route: '/mappings/:name',
    schema: controller.nameBasedSchema,
    action: controller.deactivate,
    description: 'Deactivates selected mapping'
  }
];

export default endpoints;
