import * as AuthComponent from './Auth';
import * as MappingComponent from './Mapping';
import * as UserComponent from './User';

const routings = [...UserComponent.endpoints, ...AuthComponent.endpoints, ...MappingComponent.endpoints];

export { UserComponent, AuthComponent, MappingComponent, routings };
